import { useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Link } from "react-router-dom";
import api from "../api.js";
import ManageProjectButton from "../components/buttons/ManageProjectButton";
import ManageBlogButton from "../components/buttons/ManageBlogButton";

export default function CMSHome() {
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!image) {
      setMessage("Please choose an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      setSubmitting(true);
      setMessage("");
      const res = await api.patch("/auth/profile-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(res?.data?.message ?? "Profile image updated.");
      setImage(null);
      event.target.reset();
    } catch (error) {
      setMessage(
        error?.response?.data?.message ?? "Unable to upload profile image.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="p-[2rem]">
      <section className="mt-[5rem] flex gap-1">
        <Link to="/cms/projects">
          <ManageProjectButton />
        </Link>
        <Link to="/cms/blogs">
          <ManageBlogButton />
        </Link>
      </section>

      <Disclosure defaultOpen>
        {({ open }) => (
          <section style={{ marginTop: "2rem", maxWidth: "32rem" }}>
            <DisclosureButton className="btn btn-outline-primary inline-flex items-center gap-3">
              <span>{open ? "Hide" : "Show"}</span>
              <span>Update Portfolio Image</span>
            </DisclosureButton>

            <DisclosurePanel className="mt-[5rem] bg-gray-200">
              <h2>Update Portfolio Image</h2>
              <p>
                Upload the profile image used on the home hero and assistant
                widget.
              </p>
              <form onSubmit={handleUpload} style={{ marginTop: "1rem" }}>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  className="form-control"
                  onChange={(event) =>
                    setImage(event.target.files?.[0] ?? null)
                  }
                />
                <button
                  type="submit"
                  className="btn btn-outline-primary mt-3"
                  disabled={submitting}
                >
                  {submitting ? "Uploading..." : "Upload Portfolio Image"}
                </button>
              </form>
              {message ? (
                <p style={{ marginTop: "0.75rem" }}>{message}</p>
              ) : null}
            </DisclosurePanel>
          </section>
        )}
      </Disclosure>
    </main>
  );
}
