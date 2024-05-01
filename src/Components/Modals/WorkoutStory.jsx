import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Form,
  Input,
  Upload,
  message,
  DatePicker,
  Select,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";
import UploadFileService from "../../Services/UploadFileService";
import WorkoutStoryService from "../../Services/WorkoutStoryService";
import moment from "moment";

const uploadService = new UploadFileService();
const { Option } = Select;

const WorkoutStory = () => {
  const snap = useSnapshot(state);
  const userId = snap.currentUser?.id;
  const workoutStory = snap.selectedWorkoutStory;
  const [imageUploading, setImageUploading] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState();

  useEffect(() => {
    form.setFieldsValue({
      title: workoutStory?.title,
      description: workoutStory?.description,
      exerciseType: workoutStory?.exerciseType,
      timeDuration: workoutStory?.timeDuration,
      intensity: workoutStory?.intensity,
      timestamp: workoutStory?.timestamp
        ? moment(workoutStory.timestamp)
        : null,
    });
  }, [workoutStory]);

  const [updatedStory, setUpdatedStory] = useState({
    title: workoutStory?.title || "",
    image: workoutStory?.image || "",
    description: workoutStory?.description || "",
    exerciseType: workoutStory?.exerciseType || "", // New field: Exercise Type
    timeDuration: workoutStory?.timeDuration || 0, // New field: Time Duration
    intensity: workoutStory?.intensity || "", // New field: Intensity
    timestamp: workoutStory?.timestamp || null, // New field: Timestamp
  });

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await WorkoutStoryService.updateWorkoutStory(
        snap.selectedWorkoutStory.id,
        updatedStory
      );
      state.storyCards = await WorkoutStoryService.getAllWorkoutStories();
      state.workoutStoryOpen = false;
      message.success("Successfully updated");
      form.resetFields();
    } catch (error) {
      message.error("Error while updating story");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      await WorkoutStoryService.deleteWorkoutStory(
        snap.selectedWorkoutStory.id
      );
      state.storyCards = await WorkoutStoryService.getAllWorkoutStories();
      state.workoutStoryOpen = false;
      message.success("Workout story deleted successfully");
    } catch (error) {
      message.error("Failed to delete story");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    state.workoutStoryOpen = false;
    setUpdatedStory({
      title: workoutStory?.title || "",
      image: workoutStory?.image || "",
      description: workoutStory?.description || "",
      exerciseType: workoutStory?.exerciseType || "",
      timeDuration: workoutStory?.timeDuration || 0,
      intensity: workoutStory?.intensity || "",
      timestamp: workoutStory?.timestamp || null,
    });
  };

  const handleFileChange = async (info) => {
    console.log(info);
    if (info.file) {
      setImageUploading(true);
      try {
        const uploadedImageUrl = await uploadService.uploadFile(
          info.fileList[0].originFileObj, // The file object
          "workoutStories" // The path in Firebase Storage
        );

        // Update state with the uploaded image URL
        setUpdatedStory({ ...updatedStory, image: uploadedImageUrl });
        setUploadedImage(uploadedImageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setImageUploading(false);
      }
    }
  };

  return (
    <Modal
      title={workoutStory.title}
      visible={snap.workoutStoryOpen}
      onCancel={() => {
        state.workoutStoryOpen = false;
      }}
      footer={[
        userId === workoutStory.userId && (
          <div key="editingButtons">
            <Button key="cancel" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              loading={loading}
              style={{ marginRight: 8, marginLeft: 8 }}
              key="submit"
              type="primary"
              onClick={handleUpdate}
            >
              Update
            </Button>
            <Button
              loading={deleteLoading}
              danger
              key="delete"
              type="dashed"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        ),
      ]}
    >
      {userId !== workoutStory.userId && (
        <div>
          <div style={{ maxHeight: 400 }}>
            <img src={workoutStory?.image} height={300} alt="Workout Story" />
          </div>
          <p>{workoutStory?.description}</p>
          <p>{`Excersice type : ${workoutStory?.exerciseType}`}</p>
          <p>{`Time duration ${workoutStory?.timeDuration}`}</p>
          <p>{`Intentsity ${workoutStory?.intensity}`}</p>
        </div>
      )}
      {userId === workoutStory.userId && (
        <Form form={form} layout="vertical">
          <div style={{ maxHeight: 400 }}>
            <img
              style={{ width: "100%", height: "100%", maxHeight: 400 }}
              src={uploadedImage ? uploadedImage : workoutStory?.image}
              alt="Workout Story"
            />
          </div>
          <Form.Item label="Title" name="title">
            <Input
              onChange={(e) =>
                setUpdatedStory({ ...updatedStory, title: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Timestamp" name="timestamp">
            <DatePicker
              onChange={(date) =>
                setUpdatedStory({ ...updatedStory, timestamp: date })
              }
            />
          </Form.Item>
          <Form.Item label="Exercise Type" name="exerciseType">
            <Input
              onChange={(e) =>
                setUpdatedStory({
                  ...updatedStory,
                  exerciseType: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Time Duration" name="timeDuration">
            <Input
              type="number"
              onChange={(e) =>
                setUpdatedStory({
                  ...updatedStory,
                  timeDuration: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Intensity" name="intensity">
            <Select
              onChange={(value) =>
                setUpdatedStory({ ...updatedStory, intensity: value })
              }
            >
              <Option value="No Efforts">No Efforts</Option>
              <Option value="Mid Efforts">Mid Efforts</Option>
              <Option value="Moderate Efforts">Moderate Efforts</Option>
              <Option value="Severe Efforts">Severe Efforts</Option>
              <Option value="Maximal Efforts">Maximal Efforts</Option>
            </Select>
          </Form.Item>
          {imageUploading ? (
            <p>Please wait image uploading</p>
          ) : (
            <Form.Item label="Image" name="image">
              <Upload
                beforeUpload={() => false} // Prevent default upload behavior
                onChange={handleFileChange}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />}>Upload Image</Button>
              </Upload>
            </Form.Item>
          )}
          <Form.Item label="Description" name="description">
            <Input.TextArea
              value={updatedStory.description}
              onChange={(e) =>
                setUpdatedStory({
                  ...updatedStory,
                  description: e.target.value,
                })
              }
            />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default WorkoutStory;
