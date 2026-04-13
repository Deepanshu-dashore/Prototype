"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Standard axios instance for all calls
const api = axios.create({
  baseURL: "/api",
});

export class ApiClient {
  constructor() {
    this.queryClient = useQueryClient();
  }

  // Hook-friendly get method
  useGet(key, url, options = {}) {
    return useQuery({
      queryKey: Array.isArray(key) ? key : [key],
      queryFn: async () => {
        const res = await api.get(url);
        return res.data;
      },
      ...options,
    });
  }

  // Hook-friendly post method
  usePost(key, url, options = {}) {
    return this._createMutationHook("post", key, url, options);
  }

  // Hook-friendly put method
  usePut(key, url, options = {}) {
    return this._createMutationHook("put", key, url, options);
  }

  // Hook-friendly patch method
  usePatch(key, url, options = {}) {
    return this._createMutationHook("patch", key, url, options);
  }

  // Helper for mutation methods
  _createMutationHook(method, key, url, options = {}) {
    return useMutation({
      mutationFn: async (input) => {
        let finalUrl = url;
        let data = input;
        let config = undefined;

        if (input && typeof input === "object" && !Array.isArray(input) && typeof input.append !== "function") {
          if (input.url) {
            finalUrl = input.url;
            if (input.data !== undefined) {
              data = input.data;
            } else {
              const { url: _, headers: __, ...rest } = input;
              data = rest;
            }
            if (input.headers) {
              config = { headers: input.headers };
            }
          } else if (input.id && input.data !== undefined) {
            finalUrl = input.id && url ? `${url}/${input.id}` : input.id || url;
            data = input.data;
            if (input.headers) {
              config = { headers: input.headers };
            }
          } else if (input.headers && input.data !== undefined) {
            data = input.data;
            config = { headers: input.headers };
          }
        }

        const res = config ? await api[method](finalUrl, data, config) : await api[method](finalUrl, data);
        return res.data;
      },
      onSuccess: (...args) => {
        if (key) {
          this.queryClient.invalidateQueries({
            queryKey: Array.isArray(key) ? key : [key],
          });
        }
        if (options.onSuccess) options.onSuccess(...args);
      },
      ...options,
    });
  }

  // Hook-friendly delete method
  useDelete(key, url, options = {}) {
    return useMutation({
      mutationFn: async (idOrConfig) => {
        let res;
        if (
          typeof idOrConfig === "object" &&
          idOrConfig !== null &&
          !idOrConfig.params
        ) {
          // check if it has url
          if (idOrConfig.url) {
            res = await api.delete(idOrConfig.url);
          } else {
            res = await api.delete(url, idOrConfig);
          }
        } else if (typeof idOrConfig === "object" && idOrConfig !== null) {
          // If it's an object with params, treat it as axios config
          res = await api.delete(url, idOrConfig);
        } else {
          // If it's a string/number, append to URL
          const deleteUrl = idOrConfig ? `${url}/${idOrConfig}` : url;
          res = await api.delete(deleteUrl);
        }
        return res.data;
      },
      onSuccess: (...args) => {
        this.queryClient.invalidateQueries({
          queryKey: Array.isArray(key) ? key : [key],
        });
        if (options.onSuccess) options.onSuccess(...args);
      },
      ...options,
    });
  }

  // Manually invalidate queries
  invalidate(key) {
    return this.queryClient.invalidateQueries({
      queryKey: Array.isArray(key) ? key : [key],
    });
  }

  // Access to raw axios for one-off calls
  static api = api;
}

// Hook that returns an instance of ApiClient
export const useApiClient = () => {
  return new ApiClient();
};

export default ApiClient;
