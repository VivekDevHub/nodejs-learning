# **Google Auth**

# 📚 Notes

> Topics: Google Authentication · Image Integration · Form Data
> 

---

# Google Authentication

## What is Google Auth?

Google Authentication uses **OAuth 2.0** — an open standard that allows users to sign in to your app using their Google account. It's secure, trusted, and removes the need for managing passwords yourself.

---

## Key Concepts

| Term | Description |
| --- | --- |
| OAuth 2.0 | Open standard for access delegation |
| Client ID & Secret | Credentials from Google Cloud Console |
| Access Token | Short-lived token to access Google APIs |
| Refresh Token | Used to get a new access token when it expires |
| ID Token (JWT) | Contains user info — name, email, photo |

---

## Implementation Steps

1. Go to **Google Cloud Console** → Create a new project
2. Enable **"Google Identity"** or **"Google+ API"** service
3. Create **OAuth 2.0 Credentials** (Web Application type)
4. Set **Authorized Redirect URIs** (e.g., `http://localhost:3000/auth/callback`)
5. Install library:

```bash
npm install @react-oauth/google jwt-decode
```

1. Wrap your app with the provider:

```jsx
<GoogleOAuthProvider clientId="YOUR_CLIENT_ID">
  <App />
</GoogleOAuthProvider>
```

1. Use the login component:

```jsx
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const handleSuccess = (credentialResponse) => {
  const user = jwtDecode(credentialResponse.credential);
  console.log(user.name, user.email, user.picture);
};

<GoogleLogin onSuccess={handleSuccess} onError={() => console.log('Login Failed')} />
```

1. Decode the **JWT credential** to get user info (name, email, picture)

---

## Important Notes

- **Never expose Client Secret** in frontend code
- Always **verify tokens on the backend** for security
- Use **HTTPS in production** — required by Google
- Handle **token expiry** with refresh token logic on the server

---

---

# Image Integration

## What is Image Integration?

Image integration covers uploading, previewing, storing, and displaying images in a web app — from simple file inputs to cloud-hosted optimized delivery.

---

## 🔑 Key Concepts

| Term | Description |
| --- | --- |
| `<input type="file">` | HTML element to select image files |
| FileReader API | Reads file and converts to base64 or blob URL |
| `URL.createObjectURL()` | Creates instant local preview URL |
| FormData API | Sends image to backend as multipart/form-data |
| Multer | Node.js middleware to handle file uploads |
| Cloudinary / S3 | Cloud storage for production image hosting |

---

## Implementation Steps

1. Add file input in JSX:

```jsx
<input type="file" accept="image/*" onChange={handleChange} />
```

1. Generate a preview using `URL.createObjectURL()`:

```jsx
const [preview, setPreview] = useState(null);

const handleChange = (e) => {
  const file = e.target.files[0];
  setPreview(URL.createObjectURL(file)); // instant preview
};
```

1. Display preview:

```jsx
{preview && <img src={preview} alt="Preview" width={200} />}
```

1. Create `FormData` and send to backend:

```jsx
const formData = new FormData();
formData.append('image', file);

await axios.post('/api/upload', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
```

1. Backend with **Multer** (Node.js / Express):

```jsx
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/api/upload', upload.single('image'), (req, res) => {
  res.json({ path: req.file.path });
});
```

1. Save the file path/URL to your database
2. Display using the saved URL in an `<img>` tag

---

## Important Notes

- **Validate file type & size** on both frontend AND backend
- Use **Cloudinary** for auto optimization and CDN delivery in production
- Call `URL.revokeObjectURL(url)` after use to free memory
- Use `browser-image-compression` library to compress before uploading

---

---

# Form Data

## What is Form Data?

Form Data covers collecting, validating, and submitting user inputs from HTML forms — from simple login forms to multi-step complex flows.

---

## Key Concepts

| Term | Description |
| --- | --- |
| Controlled Component | React `state` controls input values |
| Uncontrolled Component | DOM manages input via `useRef` |
| FormData API | Built-in browser API to build form payloads |
| Validation | Checking correctness of data before submission |
| `onChange` / `onSubmit` | Core React event handlers |
| React Hook Form | Library for high-performance complex forms |

---

## Implementation Steps

1. Create state for form fields:

```jsx
const [form, setForm] = useState({ name: '', email: '', password: '' });
const [errors, setErrors] = useState({});
```

1. Bind state to input elements:

```jsx
<input
  value={form.name}
  onChange={(e) => setForm({ ...form, name: e.target.value })}
/>
```

1. Write a validation function:

```jsx
const validate = () => {
  const errs = {};
  if (!form.name) errs.name = 'Name is required';
  if (!/\\S+@\\S+\\.\\S+/.test(form.email)) errs.email = 'Invalid email';
  if (form.password.length < 6) errs.password = 'Min 6 characters';
  return errs;
};
```

1. Handle form submission:

```jsx
const handleSubmit = async (e) => {
  e.preventDefault(); // stop page reload
  const errs = validate();
  if (Object.keys(errs).length > 0) return setErrors(errs);

  await axios.post('/api/submit', form);
  alert('Form submitted successfully!');
};
```

1. Attach to `<form>` element:

```jsx
<form onSubmit={handleSubmit}>
  <input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
  {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}

  <button type="submit">Submit</button>
</form>
```

---

## Important Notes

- Always validate on **both frontend and backend**
- Use **React Hook Form** for large forms — it reduces unnecessary re-renders
- **Disable submit button** while the API request is loading
- **Sanitize inputs on backend** to prevent XSS and SQL injection attacks