import { Button, Card, Form, Input, Modal, Popconfirm, Space, Spin, Table, Tag, Upload, message, Image, Empty } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined, UploadOutlined, PlayCircleOutlined, PictureOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function CategoriesTab() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [mediaModal, setMediaModal] = useState(null); // category to manage media for
  const [form] = Form.useForm();

  const load = async () => {
    setLoading(true);
    const { data } = await api.get("/categories");
    setCategories(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditing(null);
    form.resetFields();
    setModalOpen(true);
  };

  const openEdit = (cat) => {
    setEditing(cat);
    form.setFieldsValue({ name: cat.name, description: cat.description });
    setModalOpen(true);
  };

  const handleSubmit = async (values) => {
    if (editing) {
      await api.put(`/categories/${editing._id}`, values);
      message.success("Category updated");
    } else {
      await api.post("/categories", values);
      message.success("Category created");
    }
    setModalOpen(false);
    load();
  };

  const handleDelete = async (id) => {
    await api.delete(`/categories/${id}`);
    message.success("Category deleted");
    load();
  };

  const uploadMedia = async (file, categoryId, type) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const { data: uploadData } = await api.post("/upload", fd, { headers: { "Content-Type": "multipart/form-data" } });

      const category = categories.find((c) => c._id === categoryId);
      const updatePayload = {};

      if (type === "image") {
        if ((category.images || []).length >= 10) {
          message.error("Maximum 10 images allowed");
          return false;
        }
        updatePayload.images = [...(category.images || []), { url: uploadData.url, publicId: uploadData.publicId }];
      } else {
        if ((category.videos || []).length >= 2) {
          message.error("Maximum 2 videos allowed");
          return false;
        }
        updatePayload.videos = [...(category.videos || []), { url: uploadData.url, publicId: uploadData.publicId }];
      }

      await api.put(`/categories/${categoryId}`, updatePayload);
      message.success(`${type === "image" ? "Image" : "Video"} uploaded`);
      load();
    } catch (err) {
      message.error("Upload failed");
    } finally {
      setUploading(false);
    }
    return false;
  };

  const removeMedia = async (categoryId, type, index) => {
    const category = categories.find((c) => c._id === categoryId);
    const updatePayload = {};

    if (type === "image") {
      const newImages = [...(category.images || [])];
      newImages.splice(index, 1);
      updatePayload.images = newImages;
    } else {
      const newVideos = [...(category.videos || [])];
      newVideos.splice(index, 1);
      updatePayload.videos = newVideos;
    }

    await api.put(`/categories/${categoryId}`, updatePayload);
    message.success("Media removed");
    load();
  };

  // Keep mediaModal in sync with latest category data
  const activeMediaCategory = mediaModal ? categories.find((c) => c._id === mediaModal._id) || mediaModal : null;

  const columns = [
    { title: "Name", dataIndex: "name", sorter: (a, b) => a.name.localeCompare(b.name) },
    { title: "Description", dataIndex: "description", ellipsis: true },
    {
      title: "Media",
      render: (_, r) => (
        <Space>
          <Tag icon={<PictureOutlined />} color="blue">{(r.images || []).length}/10 imgs</Tag>
          <Tag icon={<PlayCircleOutlined />} color="purple">{(r.videos || []).length}/2 vids</Tag>
        </Space>
      ),
    },
    {
      title: "Created",
      render: (_, r) => new Date(r.createdAt).toLocaleDateString(),
    },
    {
      title: "Actions",
      width: 280,
      render: (_, r) => (
        <Space>
          <Button icon={<EditOutlined />} size="small" onClick={() => openEdit(r)}>Edit</Button>
          <Button icon={<UploadOutlined />} size="small" onClick={() => setMediaModal(r)}>Media</Button>
          <Popconfirm title="Delete this category?" onConfirm={() => handleDelete(r._id)}>
            <Button icon={<DeleteOutlined />} size="small" danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Categories Management</h1>
          <p className="text-gray-500 text-sm mt-1">{categories.length} categories</p>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>
          Add Category
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <Table
          rowKey="_id"
          dataSource={categories}
          columns={columns}
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </div>

      {/* Create/Edit Modal */}
      <Modal
        title={editing ? "Edit Category" : "New Category"}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        width={500}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit} className="mt-4">
          <Form.Item name="name" label="Category Name" rules={[{ required: true, message: "Name is required" }]}>
            <Input placeholder="e.g. Bath, Kitchen, Industrial" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={4} placeholder="Describe this category..." />
          </Form.Item>
          <div className="flex justify-end gap-3 mt-4">
            <Button onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              {editing ? "Update" : "Create"}
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Media Management Modal */}
      <Modal
        title={`Manage Media — ${activeMediaCategory?.name || ""}`}
        open={!!mediaModal}
        onCancel={() => setMediaModal(null)}
        footer={null}
        width={700}
      >
        {activeMediaCategory && (
          <div className="space-y-6 mt-4">
            {/* Images Section */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-700">
                  <PictureOutlined className="mr-2" />
                  Images ({(activeMediaCategory.images || []).length}/10)
                </h3>
                <Upload
                  beforeUpload={(file) => uploadMedia(file, activeMediaCategory._id, "image")}
                  showUploadList={false}
                  accept="image/*"
                  disabled={uploading || (activeMediaCategory.images || []).length >= 10}
                >
                  <Button icon={<UploadOutlined />} size="small" loading={uploading}
                    disabled={(activeMediaCategory.images || []).length >= 10}>
                    Upload Image
                  </Button>
                </Upload>
              </div>
              {(activeMediaCategory.images || []).length > 0 ? (
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                  {activeMediaCategory.images.map((img, i) => (
                    <div key={i} className="relative group">
                      <Image src={img.url} className="!w-full !h-24 object-cover rounded" />
                      <button
                        onClick={() => removeMedia(activeMediaCategory._id, "image", i)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <Empty description="No images uploaded" image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )}
            </div>

            {/* Videos Section */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-700">
                  <PlayCircleOutlined className="mr-2" />
                  Videos ({(activeMediaCategory.videos || []).length}/2)
                </h3>
                <Upload
                  beforeUpload={(file) => uploadMedia(file, activeMediaCategory._id, "video")}
                  showUploadList={false}
                  accept="video/*"
                  disabled={uploading || (activeMediaCategory.videos || []).length >= 2}
                >
                  <Button icon={<UploadOutlined />} size="small" loading={uploading}
                    disabled={(activeMediaCategory.videos || []).length >= 2}>
                    Upload Video
                  </Button>
                </Upload>
              </div>
              {(activeMediaCategory.videos || []).length > 0 ? (
                <div className="space-y-3">
                  {activeMediaCategory.videos.map((vid, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <video src={vid.url} className="w-40 h-24 object-cover rounded" controls />
                      <div className="flex-1">
                        <p className="text-sm text-gray-500 truncate">{vid.url}</p>
                      </div>
                      <Button icon={<DeleteOutlined />} size="small" danger onClick={() => removeMedia(activeMediaCategory._id, "video", i)} />
                    </div>
                  ))}
                </div>
              ) : (
                <Empty description="No videos uploaded" image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
