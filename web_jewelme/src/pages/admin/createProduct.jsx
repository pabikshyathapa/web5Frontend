import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useCreateProduct } from '../../hooks/admin/useAdminProduct'

export default function CreateProduct() {
  const { mutate, isPending, error } = useCreateProduct()

  const validationSchema = Yup.object({
    name: Yup.string().required("Product name is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .required("Price is required")
      .positive("Price must be greater than 0"),
    image: Yup.mixed()
      .nullable()
      .test("fileSize", "Image too large", value => !value || (value && value.size <= 5 * 1024 * 1024)),
  })

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      image: null,
    },
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData()
      formData.append("name", values.name)
      formData.append("price", values.price)
      if (values.image) formData.append("productImage", values.image)

      mutate(formData, {
        onSuccess: () => {
          formik.resetForm()
          alert("Product added successfully!")
        },
      })
    },
  })

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl bg-white shadow-2xl rounded-3xl p-8">
        <h2 className="text-2xl font-bold text-red-500 mb-6 text-center">Add Product</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Product Name</label>
            <input
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Price</label>
            <input
              name="price"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.price}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            {formik.touched.price && formik.errors.price && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.price}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Product Image</label>
            <input
              name="image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.currentTarget.files[0]
                if (file) formik.setFieldValue("image", file)
              }}
              className="w-full bg-white px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            {formik.touched.image && formik.errors.image && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.image}</p>
            )}
          </div>

          {/* Image Preview */}
          {formik.values.image && (
            <div className="mt-4">
              <p className="text-gray-600 mb-2 font-medium">Image Preview:</p>
              <img
                className="w-32 h-32 object-cover rounded-xl border shadow"
                src={URL.createObjectURL(formik.values.image)}
                alt="Preview"
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 shadow-md"
            >
              {isPending ? "Submitting..." : "Create Product"}
            </button>
          </div>

          {error && <p className="text-red-600 text-sm">{error.message}</p>}
        </form>
      </div>
    </div>
  )
}
