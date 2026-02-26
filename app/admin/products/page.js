"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
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
  const isEdit = Boolean(editProduct);
  const [form, setForm] = useState({ code: "", description: "" });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
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
    } else {
      // clear refs on close
      setSaving(false);
    }
  }, [isOpen, editProduct]);

  // Escape key closes modal
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape" && !saving) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, saving, onClose]);

  const validate = () => {
    const e = {};
    if (!form.code.trim()) e.code = "Product code is required.";
    if (!form.description.trim()) e.description = "Description is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = useCallback(
    async (e) => {
      if (e?.preventDefault) e.preventDefault();
      if (!validate()) {
        // focus the first errored field
        setTimeout(() => {
          const firstErr = document.querySelector(
            "#product-code:invalid, [data-error='true']",
          );
          firstErr?.focus();
        }, 50);
        return;
      }
      setSaving(true);
      setServerError("");
      try {
        if (isEdit) {
          await axios.put(`/api/product/${editProduct._id}`, form);
        } else {
          await axios.post("/api/product", form);
        }
        onSaved();
        onClose();
      } catch (err) {
        setServerError(
          err.response?.data?.message || err.message || "Something went wrong",
        );
      } finally {
        setSaving(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [form, isEdit, editProduct, onSaved, onClose],
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
                className={`block w-full pl-9 pr-3 py-2.5 border rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-1 transition-all ${
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
                className={`block w-full pl-9 pr-3 py-2.5 border rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-1 transition-all resize-none ${
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
              className="flex-1 py-2.5 px-4 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 shadow-sm transition-all text-sm flex items-center justify-center gap-2"
            >
              {saving ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <CheckIcon className="w-4 h-4" />
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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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
  const [isDeleting, setIsDeleting] = useState(false);

  // Debounced fetch on search / page change
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts(pagination.currentPage);
    }, 300);
    return () => clearTimeout(timer);
  }, [pagination.currentPage, searchQuery]);

  const fetchProducts = async (page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append("page", page);
      params.append("limit", pagination.limit);
      if (searchQuery) params.append("search", searchQuery);

      const res = await axios.get(`/api/product?${params.toString()}`);
      if (res.data?.success) {
        const data = res.data.data;
        setProducts(data.products || []);
        setPagination((prev) => ({
          ...prev,
          totalPages: data.totalPages || 1,
          totalItems: data.totalProducts || 0,
          currentPage: data.currentPage || page,
        }));
      } else {
        setError(res.data?.message || "Failed to fetch products");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

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
    try {
      setIsDeleting(true);
      const res = await axios.delete(`/api/product/${deleteModal.productId}`);
      if (res.data?.success) {
        fetchProducts(pagination.currentPage);
        setDeleteModal({ isOpen: false, productId: null });
      } else {
        alert(res.data?.message || "Failed to delete product");
      }
    } catch (err) {
      alert(
        err.response?.data?.message || err.message || "Something went wrong",
      );
    } finally {
      setIsDeleting(false);
    }
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
    <div className="min-h-screen py-8 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Product Management
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Add, edit, and manage all products in the catalogue.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Total badge */}
            <div className="bg-indigo-50 border border-indigo-100 rounded-lg px-4 py-2.5 flex items-center gap-2">
              <ArchiveBoxIcon className="w-5 h-5 text-indigo-600" />
              <div className="flex items-center gap-2">
                <p className="text-xs text-indigo-600 font-medium">
                  Total Products
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
            {/* Add button */}
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg hover:bg-primary/90 shadow-sm transition-all active:scale-95 text-sm font-medium"
            >
              <PlusIcon className="w-4 h-4" />
              Add Product
            </button>
          </div>
        </div>

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
              onKeyDown={(e) => e.key === "Enter" && fetchProducts(1)}
            />
            <button
              onClick={() => fetchProducts(1)}
              className="absolute right-1 top-1 bottom-1 px-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-md text-xs font-medium transition-colors"
              type="button"
            >
              Search
            </button>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="min-h-[400px]">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
            </div>
          ) : error ? (
            <div className="rounded-lg bg-red-50 p-4 border border-red-100 text-center">
              <p className="text-sm text-red-600 font-medium">{error}</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-200 shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50">
                <ArchiveBoxIcon className="h-7 w-7 text-indigo-400" />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-gray-900">
                {searchQuery ? "No products found" : "No products yet"}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchQuery
                  ? "Try adjusting your search query."
                  : "Get started by adding your first product."}
              </p>
              {!searchQuery && (
                <button
                  onClick={openAddModal}
                  className="mt-5 inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-all"
                >
                  <PlusIcon className="w-4 h-4" />
                  Add Product
                </button>
              )}
            </div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50/50 border-b border-gray-100">
                      <tr>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Product Code
                        </th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Created
                        </th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {products.map((product, index) => (
                        <motion.tr
                          key={product._id}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.04 }}
                          className="hover:bg-gray-50/60 transition-colors group"
                        >
                          {/* Code */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 shrink-0 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                                <ArchiveBoxIcon className="w-5 h-5 text-indigo-600" />
                              </div>
                              <span className="text-sm font-semibold text-gray-900 font-mono tracking-wide">
                                {product.code}
                              </span>
                            </div>
                          </td>

                          {/* Description */}
                          <td className="px-6 py-4 max-w-xs">
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {product.description}
                            </p>
                          </td>

                          {/* Created date */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                              <CalendarIcon className="w-3.5 h-3.5 text-gray-400" />
                              {formatDate(product.createdAt)}
                            </div>
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
                              <button
                                onClick={() => handleDelete(product._id)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-red-600 text-white hover:bg-red-700 transition-colors"
                                title="Delete Product"
                              >
                                Delete
                                <TrashIcon className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Table footer */}
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

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="mt-6 px-6 py-4 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-sm text-gray-500">
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
                            <span key={pageNum} className="px-1 text-gray-400">
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
        onSaved={() => fetchProducts(editProduct ? pagination.currentPage : 1)}
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
    </div>
  );
}
