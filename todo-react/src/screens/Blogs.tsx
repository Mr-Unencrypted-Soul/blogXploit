import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newBlog, setNewBlog] = useState({ title: '', description: '', id: null });
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")!);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/blog/get-all-blogs', {
          headers: {
            Authorization: `Bearer ${token}`,
            'X-XSS-Protection': '1; mode=block'
          },
        });
        setBlogs(response.data.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const handleAddBlog = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3001/blog/create-blog', newBlog, {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-XSS-Protection': '1; mode=block'
        },
      });
      // After adding the blog, fetch updated list of blogs
      const updatedBlogs = await axios.get('http://localhost:3001/blog/get-all-blogs', {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-XSS-Protection': '1; mode=block'
        },
      });
      setBlogs(updatedBlogs.data.data);
      handleCloseModal();
    } catch (error) {
      console.error('Error adding blog:', error);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.get(`http://localhost:3001/blog/delete-blog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-XSS-Protection': '1; mode=block'
        },
      });
      // After deleting the blog, fetch updated list of blogs
      const updatedBlogs = await axios.get('http://localhost:3001/blog/get-all-blogs', {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-XSS-Protection': '1; mode=block'
        },
      });
      setBlogs(updatedBlogs.data.data);
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const handleUpdateBlog = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch('http://localhost:3001/blog/blog/' + newBlog.id, newBlog, {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-XSS-Protection': '1; mode=block'
        },
      });
      // After adding the blog, fetch updated list of blogs
      const updatedBlogs = await axios.get('http://localhost:3001/blog/get-all-blogs', {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-XSS-Protection': '1; mode=block'
        },
      });
      setBlogs(updatedBlogs.data.data);
      handleCloseModal();
    } catch (error) {
      console.error('Error adding blog:', error);
    }
  }
  const handleShowModal = () => setShowModal(true);

  const handleCloseModal = () => {
    setShowModal(false);
    setNewBlog({ title: '', description: '', id: null }); // Reset newBlog state
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBlog((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const executeScript = (htmlContent: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const scriptTags = doc.getElementsByTagName('script');
    for (let i = 0; i < scriptTags.length; i++) {
      const scriptContent = scriptTags[i].textContent;
      if (scriptContent) {
        try {
          // Execute script content
          eval(scriptContent);
        } catch (error) {
          console.error('Error executing script:', error);
        }
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <Button variant="primary" onClick={handleShowModal} className="mb-3">
            Add Blog
          </Button>
          <Button variant="primary" onClick={() => { localStorage.clear(); navigate('/login') }} className="mb-3">
            Logout
          </Button>
          <ul className="list-group">

            {blogs.map((blog) => (
              <li key={blog._id} className="list-group-item">
                {/* <h3>{blog.title}</h3> */}
                {/* {blog.description.includes("<script>") ? eval(blog.description) : blog.description} */}
                {
                  blog.description.includes("<script>") ?

                    executeScript(blog.description) : blog.description

                }
                {
                  blog.description.includes("<script>") ?

                    blog.description : ""

                }
                {/* <h3>{blog.title}</h3>
                  <div ref={element => {
                    if (element) {
                      element.innerHTML = blog.description;
                    }
                  }}></div> */}


                <p>Created by: {blog.createdBy}</p>
                {user.role === "admin" ? <button onClick={() => { handleDeleteBlog(blog._id) }}>Delete</button> : <></>}
                {user.role === "admin" || user.role === "user" ? <button onClick={() => {
                  setShowModal(true)
                  setNewBlog({
                    ...newBlog,
                    title: blog.title,
                    description: blog.description,
                    id: blog._id
                  })
                }}>Update</button> : <></>}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {
              newBlog.id ? "Update Blog" : "Add New Blog"
            }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                name="title"
                value={newBlog.title}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                name="description"
                value={newBlog.description}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={
            newBlog.id ? handleUpdateBlog : handleAddBlog
          }>
            {
              newBlog.id ? "Update" : "Add"
            }
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Blogs;
