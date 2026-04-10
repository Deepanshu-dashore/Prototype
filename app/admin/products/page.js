"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useApiClient } from "@/src/config/axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  CubeIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  CheckIcon,
  HashtagIcon,
  DocumentTextIcon,
  CalendarIcon,
  ExclamationCircleIcon,
  PencilSquareIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";
import ConfirmationModal from "@/src/components/ui/ConfirmationModal";
import {
  TableLoadingSkeleton,
  TableEmptyState,
} from "@/src/components/ui/TableState";
import AdminHeader from "@/src/components/admin/AdminHeader";

/* ─── Small reusable field component ─── */
function FormField({ label, id, error, children }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1.5"
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
          <ExclamationCircleIcon className="w-3.5 h-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

/* ─── Add / Edit Modal ─── */
function ProductModal({ isOpen, onClose, onSaved, editProduct }) {
  const api = useApiClient();
  const isEdit = Boolean(editProduct);
  const [form, setForm] = useState({ code: "", description: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const codeRef = useRef(null);
  const descRef = useRef(null);

  // Pre-fill form when editing
  useEffect(() => {
    if (isOpen) {
      if (editProduct) {
        setForm({
          code: editProduct.code || "",
          description: editProduct.description || "",
        });
      } else {
        setForm({ code: "", description: "" });
      }
      setErrors({});
      setServerError("");
      // focus first field
      setTimeout(() => codeRef.current?.focus(), 80);
    }
  }, [isOpen, editProduct]);

  const validate = () => {
    const e = {};
    if (!form.code.trim()) e.code = "Product code is required.";
    if (!form.description.trim()) e.description = "Description is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const saveMutation = api.usePost("products", "/product", {
    onSuccess: () => {
      onSaved();
      onClose();
    },
    onError: (err) => {
      setServerError(
        err.response?.data?.message || err.message || "Something went wrong",
      );
    },
  });

  const updateMutation = api.usePut(
    "products",
    `/product/${editProduct?._id}`,
    {
      onSuccess: () => {
        onSaved();
        onClose();
      },
      onError: (err) => {
        setServerError(
          err.response?.data?.message || err.message || "Something went wrong",
        );
      },
    },
  );

  const saving = saveMutation.isPending || updateMutation.isPending;

  // Escape key closes modal
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape" && !saving) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, saving, onClose]);

  const handleSubmit = useCallback(
    async (e) => {
      if (e?.preventDefault) e.preventDefault();
      if (!validate()) {
        setTimeout(() => {
          const firstErr = document.querySelector(
            "#product-code:invalid, [data-error='true']",
          );
          firstErr?.focus();
        }, 50);
        return;
      }
      setServerError("");
      if (isEdit) {
        updateMutation.mutate(form);
      } else {
        saveMutation.mutate(form);
      }
    },
    [form, isEdit, editProduct, onSaved, onClose, saveMutation, updateMutation],
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={!saving ? onClose : undefined}
      />
      <motion.div
        key="modal"
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
        className="fixed z-50 bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
              <CubeIcon className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">
                {isEdit ? "Edit Product" : "Add New Product"}
              </h2>
              <p className="text-xs text-gray-500">
                {isEdit
                  ? "Update product details"
                  : "Fill in the product details below"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={saving}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {serverError && (
            <div className="rounded-lg bg-red-50 border border-red-100 px-4 py-3 flex items-center gap-2">
              <ExclamationCircleIcon className="w-4 h-4 text-red-500 shrink-0" />
              <p className="text-sm text-red-600">{serverError}</p>
            </div>
          )}

          <FormField label="Product Code" id="product-code" error={errors.code}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HashtagIcon className="h-4 w-4 text-gray-400" />
              </div>
              <input
                ref={codeRef}
                id="product-code"
                type="text"
                placeholder="e.g. CC-HD-001"
                value={form.code}
                onChange={(e) => {
                  setForm((f) => ({ ...f, code: e.target.value }));
                  if (errors.code) setErrors((v) => ({ ...v, code: "" }));
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    // Move focus to description instead of submitting immediately
                    e.preventDefault();
                    descRef.current?.focus();
                  }
                }}
                className={`block w-full pl-9 pr-3 py-2.5 border rounded-lg sm:text-sm text-xs placeholder-gray-400 focus:outline-none focus:ring-1 transition-all ${
                  errors.code
                    ? "border-red-300 focus:ring-red-400 focus:border-red-400"
                    : "border-gray-200 focus:ring-primary focus:border-primary"
                }`}
              />
            </div>
          </FormField>

          <FormField
            label="Description"
            id="product-desc"
            error={errors.description}
          >
            <div className="relative">
              <div className="absolute top-2.5 left-3 pointer-events-none">
                <DocumentTextIcon className="h-4 w-4 text-gray-400" />
              </div>
              <textarea
                ref={descRef}
                id="product-desc"
                rows={3}
                placeholder="Enter a brief product description… (Ctrl+Enter to submit)"
                value={form.description}
                onChange={(e) => {
                  setForm((f) => ({ ...f, description: e.target.value }));
                  if (errors.description)
                    setErrors((v) => ({ ...v, description: "" }));
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                    // Ctrl+Enter (or ⌘+Enter on Mac) submits
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                className={`block w-full sm:text-sm text-xs pl-9 pr-3 py-2.5 border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-1 transition-all resize-none ${
                  errors.description
                    ? "border-red-300 focus:ring-red-400 focus:border-red-400"
                    : "border-gray-200 focus:ring-primary focus:border-primary"
                }`}
              />
            </div>
          </FormField>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="flex-1 py-2.5 px-4 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2.5 px-2 sm:px-4 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 shadow-sm transition-all text-sm flex items-center justify-center gap-2"
            >
              {saving ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <CheckIcon className="w-4 h-4 sm:inline hidden" />
                  {isEdit ? "Save Changes" : "Add Product"}
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── Main Page ─── */
export default function ProductsPage() {
  const api = useApiClient();
  const [searchQuery, setSearchQuery] = useState("");

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    limit: 10,
  });

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  // Delete confirmation
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    productId: null,
  });
  const [visibilityModal, setVisibilityModal] = useState({
    isOpen: false,
    productId: null,
  });

  const params = new URLSearchParams();
  params.append("page", pagination.currentPage);
  params.append("limit", pagination.limit);
  if (searchQuery) params.append("search", searchQuery);

  const {
    data: productsData,
    isLoading: loading,
    error: fetchError,
  } = api.useGet(
    ["products", pagination.currentPage, searchQuery],
    `/product?${params.toString()}`,
  );

  const products = productsData?.data?.products || [];
  const error = fetchError?.message || "";

  useEffect(() => {
    if (productsData?.data) {
      const data = productsData.data;
      setPagination((prev) => ({
        ...prev,
        totalPages: data.totalPages || 1,
        totalItems: data.totalProducts || 0,
        currentPage: data.currentPage || prev.currentPage,
      }));
    }
  }, [productsData]);

  const visibilityMutation = api.usePatch(["products"], "/product/status", {
    onSuccess: () => {
      setVisibilityModal({ isOpen: false, productId: null });
      api.invalidate(["products"]);
    },
    onError: (err) =>
      alert(
        err.response?.data?.message || err.message || "Something went wrong",
      ),
  });

  const deleteMutation = api.useDelete(["products"], "/product", {
    onSuccess: () => {
      setDeleteModal({ isOpen: false, productId: null });
      api.invalidate(["products"]);
    },
    onError: (err) =>
      alert(
        err.response?.data?.message || err.message || "Something went wrong",
      ),
  });

  const isUpdating = visibilityMutation.isPending;
  const isDeleting = deleteMutation.isPending;

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const openAddModal = () => {
    setEditProduct(null);
    setModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditProduct(product);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setDeleteModal({ isOpen: true, productId: id });
  };

  const confirmDelete = async () => {
    if (!deleteModal.productId) return;
    deleteMutation.mutate(deleteModal.productId);
  };

  const toggleVisibility = async (id) => {
    visibilityMutation.mutate({ id });
  };

  const formatDate = (date) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen pb-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* ── Header ── */}
        <AdminHeader
          title="Product Management"
          subtitle="Add, edit, and manage all products in the catalogue."
          buttonText={
            <span>
              Add <span className="hidden sm:inline">Product</span>
            </span>
          }
          onClick={openAddModal}
          addOn={
            <div className="bg-white border border-indigo-100 rounded-lg sm:px-4 px-2 py-2.5 flex items-center gap-2">
              <ArchiveBoxIcon className="w-5 h-5 hidden sm:inline text-indigo-600" />
              <div className="flex items-center gap-2">
                <p className="text-xs text-indigo-600 font-medium">
                  <span className="hidden sm:inline">Total</span> Products
                </p>
                <p className="text-base font-bold bg-indigo-900 text-white rounded px-2">
                  {loading ? (
                    <span className="inline-block w-8 h-5 bg-indigo-700 rounded animate-pulse" />
                  ) : (
                    pagination.totalItems
                  )}
                </p>
              </div>
            </div>
          }
        />

        <div className="px-4 sm:px-6 lg:px-8">
          {/* ── Search Bar ── */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex flex-col md:flex-row gap-4 justify-start items-center">
            <div className="relative w-full md:w-72">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by code or description..."
                className="block w-full pl-9 pr-20 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  setPagination((p) => ({ ...p, currentPage: 1 }))
                }
              />
              <button
                onClick={() => setPagination((p) => ({ ...p, currentPage: 1 }))}
                className="absolute right-1 top-1 bottom-1 px-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-md text-xs font-medium transition-colors"
                type="button"
              >
                Search
              </button>
            </div>
          </div>

          {/* ── Content ── */}
          <div className="min-h-[400px]">
            {error ? (
              <div className="rounded-lg bg-red-50 p-4 border border-red-100 text-center">
                <p className="text-sm text-red-600 font-medium">{error}</p>
              </div>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                >
                  <div className="overflow-x-auto w-[calc(100vw-3.5rem)] md:w-[calc(100vw-2rem)] lg:w-auto relative">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-gray-100/70 border-b border-gray-100">
                        <tr>
                          <th className="px-6 py-4 text-xs font-semibold text-gray-700 uppercase tracking-wider text-nowrap">
                            Product Code
                          </th>
                          <th className="px-6 py-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Description
                          </th>
                          <th className="px-6 py-4 text-xs font-semibold text-gray-700 uppercase tracking-wider text-nowrap">
                            Created
                          </th>
                          <th className="px-6 py-4 text-xs font-semibold text-gray-700 uppercase tracking-wider text-nowrap">
                            Visibility
                          </th>
                          <th className="px-6 py-4 text-xs font-semibold text-gray-700 uppercase tracking-wider text-right text-nowrap">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {loading ? (
                          <TableLoadingSkeleton
                            columns={5}
                            rows={pagination.limit}
                          />
                        ) : products.length === 0 ? (
                          <TableEmptyState
                            title={
                              searchQuery
                                ? "No products found"
                                : "No products yet"
                            }
                            message={
                              searchQuery
                                ? "Try adjusting your search query to find what you're looking for."
                                : "Get started by adding your first product to the catalogue."
                            }
                            colSpan={5}
                          />
                        ) : (
                          products.map((product, index) => (
                            <motion.tr
                              key={product._id}
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.04 }}
                              className={`hover:bg-gray-50/60 transition-colors group ${index % 2 !== 0 ? "bg-slate-50" : "bg-white"}`}
                            >
                              {/* Code */}
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="sm:h-10 sm:w-10 h-6 w-6 shrink-0 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                                    <ArchiveBoxIcon className="sm:w-5 sm:h-5 w-3 h-3 text-indigo-600" />
                                  </div>
                                  <span className="sm:text-sm text-xs font-semibold text-gray-800 tracking-wide text-nowrap">
                                    {product.code}
                                  </span>
                                </div>
                              </td>

                              {/* Description */}
                              <td className="px-6 py-4 max-w-xs">
                                <p className="sm:text-sm text-xs text-gray-600 line-clamp-2">
                                  {product.description}
                                </p>
                              </td>

                              {/* Created date */}
                              <td className="px-6 py-4 text-nowrap">
                                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                  <CalendarIcon className="w-3.5 h-3.5 text-gray-500" />
                                  {formatDate(product.createdAt)}
                                </div>
                              </td>

                              {/* Visibility */}
                              <td className="px-6 py-4">
                                <button
                                  disabled={isUpdating && visibilityMutation.variables?.id === product._id}
                                  onClick={() =>
                                    setVisibilityModal({
                                      isOpen: true,
                                      productId: product._id,
                                    })
                                  }
                                  className={`relative inline-flex sm:h-6 sm:w-11 h-4.5 w-8 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-transparent focus:ring-offset-2 disabled:opacity-50 ${
                                    product.visibility !== false
                                      ? "bg-indigo-500"
                                      : "bg-gray-300"
                                  }`}
                                  role="switch"
                                  aria-checked={product.visibility !== false}
                                  title="Toggle Visibility"
                                >
                                  {isUpdating && visibilityMutation.variables?.id === product._id ? (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    </div>
                                  ) : (
                                    <span
                                      className={`pointer-events-none sm:translate-y-0.5 inline-block sm:h-4 sm:w-4 h-3.5 w-3.5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                        product.visibility !== false
                                          ? "sm:translate-x-5.5 translate-x-3.5"
                                          : "sm:translate-x-0.5 -translate-x-0.5"
                                      }`}
                                    />
                                  )}
                                </button>
                              </td>

                              {/* Actions */}
                              <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() => openEditModal(product)}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-emerald-700 text-white hover:bg-emerald-800 transition-colors"
                                    title="Edit Product"
                                  >
                                    Edit
                                    <PencilSquareIcon className="w-3.5 h-3.5" />
                                  </button>
                                  {/* <button
                                onClick={() => handleDelete(product._id)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-red-600 text-white hover:bg-red-700 transition-colors"
                                title="Delete Product"
                              >
                                Delete
                                <TrashIcon className="w-3.5 h-3.5" />
                              </button> */}
                                </div>
                              </td>
                            </motion.tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="px-6 py-3 bg-gray-50/50 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                      Showing{" "}
                      <span className="font-medium text-gray-900">
                        {products.length}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium text-gray-900">
                        {pagination.totalItems}
                      </span>{" "}
                      products
                    </p>
                  </div>
                </motion.div>

                {pagination.totalPages > 1 && (
                  <div className="mt-6 px-6 py-4 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-gray-500 hidden sm:block">
                      Showing{" "}
                      <span className="font-medium text-gray-900">
                        {(pagination.currentPage - 1) * pagination.limit + 1}
                      </span>{" "}
                      to{" "}
                      <span className="font-medium text-gray-900">
                        {Math.min(
                          pagination.currentPage * pagination.limit,
                          pagination.totalItems,
                        )}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium text-gray-900">
                        {pagination.totalItems}
                      </span>{" "}
                      results
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setPagination((prev) => ({
                            ...prev,
                            currentPage: Math.max(1, prev.currentPage - 1),
                          }))
                        }
                        disabled={pagination.currentPage === 1}
                        className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      >
                        Previous
                      </button>
                      <div className="flex items-center gap-1">
                        {[...Array(pagination.totalPages)].map((_, i) => {
                          const pageNum = i + 1;
                          if (
                            pageNum === 1 ||
                            pageNum === pagination.totalPages ||
                            (pageNum >= pagination.currentPage - 1 &&
                              pageNum <= pagination.currentPage + 1)
                          ) {
                            return (
                              <button
                                key={pageNum}
                                onClick={() =>
                                  setPagination((prev) => ({
                                    ...prev,
                                    currentPage: pageNum,
                                  }))
                                }
                                className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                                  pagination.currentPage === pageNum
                                    ? "bg-primary text-white shadow-md"
                                    : "text-gray-600 hover:bg-gray-100"
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          } else if (
                            (pageNum === pagination.currentPage - 2 &&
                              pageNum > 1) ||
                            (pageNum === pagination.currentPage + 2 &&
                              pageNum < pagination.totalPages)
                          ) {
                            return (
                              <span
                                key={pageNum}
                                className="px-1 text-gray-400"
                              >
                                ...
                              </span>
                            );
                          }
                          return null;
                        })}
                      </div>
                      <button
                        onClick={() =>
                          setPagination((prev) => ({
                            ...prev,
                            currentPage: Math.min(
                              prev.totalPages,
                              prev.currentPage + 1,
                            ),
                          }))
                        }
                        disabled={
                          pagination.currentPage === pagination.totalPages
                        }
                        className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* ── Add / Edit Modal ── */}
        <ProductModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSaved={() => api.invalidate(["products", pagination.currentPage, searchQuery])}
          editProduct={editProduct}
        />

        {/* ── Delete Confirmation Modal ── */}
        <ConfirmationModal
          isOpen={deleteModal.isOpen}
          onClose={() => setDeleteModal({ isOpen: false, productId: null })}
          onConfirm={confirmDelete}
          title="Delete Product"
          message="Are you sure you want to permanently delete this product? This action cannot be undone."
          type="delete"
          confirmText="Delete Product"
          isLoading={isDeleting}
        />
        <ConfirmationModal
          isOpen={visibilityModal.isOpen}
          icon={({ className }) => (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={className}
              viewBox="0 0 24 24"
            >
              <defs>
                <path
                  id="SVGnvzg3hCy"
                  fill="currentColor"
                  d="M15.92 12.799Q16 12.41 16 12a4 4 0 0 0-4.799-3.92zM8.667 9.788a4 4 0 0 0 5.545 5.545z"
                ></path>
              </defs>
              <g fill="none">
                <use
                  href="#SVGnvzg3hCy"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></use>
                <path
                  fill="currentColor"
                  fillOpacity={0.25}
                  fillRule="evenodd"
                  d="m15.787 16.909l-8.929-8.93c-1.314.986-2.373 2.138-3.046 2.955c-.388.472-.582.707-.582 1.066s.194.594.582 1.066C5.232 14.79 8.364 18 12 18c1.353 0 2.636-.445 3.787-1.091M9.577 6.456A7 7 0 0 1 12 6c3.636 0 6.768 3.21 8.188 4.934c.388.472.582.707.582 1.066s-.194.594-.582 1.066a19.5 19.5 0 0 1-1.95 2.05z"
                  clipRule="evenodd"
                ></path>
                <use
                  href="#SVGnvzg3hCy"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></use>
                <path
                  stroke="currentColor"
                  strokeWidth={1.2}
                  d="m8 5l12 12"
                ></path>
              </g>
            </svg>
          )}
          onClose={() => setVisibilityModal({ isOpen: false, productId: null })}
          onConfirm={() => {
            toggleVisibility(visibilityModal.productId);
          }}
          title="Visibility Update"
          message="Are you sure you want to update visibility of this product?"
          type="edit"
          confirmText="Update Visibility"
          isLoading={isUpdating}
        />
      </div>
    </div>
  );
}
