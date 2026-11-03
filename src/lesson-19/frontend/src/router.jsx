// frontend/src/router.jsx
import App from './App';
import ResourceDirectoryPage from './pages/ResourceDirectoryPage';
import AdminPage from './pages/AdminPage';
import { redirect, createBrowserRouter } from 'react-router';

// Remember to have this constant in place before calling createBrowserRouter()
const API_BASE_URL = 'http://localhost:3000';

export const router = createBrowserRouter([
    {
        path: '/', // Root-relative path for the app
        element: <App />,
        children: [
            {
                index: true, // default "page" for the parent path
                element: <ResourceDirectoryPage />,
                loader: resourceDirectoryLoader,
            },
            {
                path: 'admin', // path is /admin
                element: <AdminPage />,
                loader: adminLoader,
                action: adminAction,
            },
            {
                path: 'admin/:resourceId', // path is admin/tutoring
                element: <AdminPage />,
                loader: adminLoader,
                action: adminAction,
            },
        ]
    }
]);

// #region Actions - to PUT/POST/PATCH/DELETE data
// Only the AdminPage.jsx is processing <form> input
export async function adminAction({ request, params }) {
    const formData = await request.formData();

    const payload = {
        title: formData.get('title'),
        category: formData.get('category'),
        summary: formData.get('summary'),
        location: formData.get('location'),
        hours: formData.get('hours'),
        contact: formData.get('contact'),
        virtual: formData.get('virtual') === 'on',
        openNow: formData.get('openNow') === 'on',
    };

    const isEditing = Boolean(params.resourceId);
    const url = isEditing
              ? `${API_BASE_URL}/resources/${params.resourceId}`
              : `${API_BASE_URL}/resources`;
    const method = isEditing ? 'PUT' : 'POST';

    const res = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        throw new Error(`Could not ${isEditing ? 'update' : 'create'} resource`);
    }

    const savedResource = await res.json();

    return redirect(`/admin/${savedResource.id}`);
}
// #endregion

// #region Loaders - to GET data
// URL: /
// Page: ResourceDirectoryPage.jsx
export async function resourceDirectoryLoader() {
    const resources = await fetchResources();
    return { resources };
}

// URL: /admin
//      /admin/:resourceId
// Page: AdminPage.jsx
export async function adminLoader({ params }) {
    const resources = await fetchResources();

    if (!params.resourceId) {
        return {
            resources,
            resourceId: null,
            selectedResource: null,
        };
    }

    const selectedResource = await fetchResourceById(params.resourceId);

    return {
        resources,
        resourceId: params.resourceId,
        selectedResource,
    };
}
// #endregion

// #region Private data fetching functions
function fetchResources() {
  return fetch(`${API_BASE_URL}/resources`)
    .then(res => {
        if (!res.ok) {
          throw new Error(`Could not load resources: ${res.status}`);
        }
      
        return res.json();
    });
}

async function fetchResourceById(resourceId) {
  const res = await fetch(`${API_BASE_URL}/resources/${resourceId}`);

  if (!res.ok) {
    throw new Error(`Could not load resource: ${res.status}`);
  }

  return res.json();
}
// #endregion