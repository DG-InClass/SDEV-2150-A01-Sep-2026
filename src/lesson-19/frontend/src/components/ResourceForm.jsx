import { Form, useNavigate } from 'react-router';
import { useState } from 'react';

export default function ResourceForm({ initialData, isEditing, isSubmitting }) {
  const [formData, setFormData] = useState(initialData);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value, type, checked } = e.target; // <input name="openNow" checked value type

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  function handleReset() {
    if (isEditing) {
      navigate('/admin');
    } else{
      setFormData(initialData);
    }
  }

  return (
    <Form method="post" className="space-y-4">
      <div className="space-y-1">
        <label htmlFor="title" className="block text-sm font-medium">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          className="input input-bordered w-full"
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="category" className="block text-sm font-medium">Category</label>
        <input
          id="category"
          name="category"
          type="text"
          className="input input-bordered w-full"
          value={formData.category}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="summary" className="block text-sm font-medium">Summary</label>
        <input
          id="summary"
          name="summary"
          type="text"
          className="input input-bordered w-full"
          value={formData.summary}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="location" className="block text-sm font-medium">Location</label>
        <input
          id="location"
          name="location"
          type="text"
          className="input input-bordered w-full"
          value={formData.location}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="hours" className="block text-sm font-medium">Hours</label>
        <input
          id="hours"
          name="hours"
          type="text"
          className="input input-bordered w-full"
          value={formData.hours}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="contact" className="block text-sm font-medium">Contact</label>
        <input
          id="contact"
          name="contact"
          type="text"
          className="input input-bordered w-full"
          value={formData.contact}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="virtual" className="block text-sm font-medium">virtual</label>
        <input
          id="virtual"
          name="virtual"
          type="checkbox"
          checked={formData.virtual}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="openNow" className="block text-sm font-medium">Open Now</label>
        <input
          id="openNow"
          name="openNow"
          type="checkbox"
          checked={formData.openNow}
          onChange={handleChange}
        />
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          className="rounded border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          onClick={handleReset}
        >
          {isEditing ? 'Clear' : 'Reset'}
        </button>

        <button type="submit" disabled={isSubmitting} className="rounded bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700">
          {isSubmitting ? 'Saving...' : isEditing ? 'Update Resource' : 'Add Resource'}
        </button>
      </div>
    </Form>
  );
}