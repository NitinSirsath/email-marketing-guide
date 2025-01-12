import { useEffect, useState } from "react";
import useCustomAxios from "../../../../services/api/customAxios";
import { emailTemplates } from "../components/mailTemplates/emailTemplates";

const useTimelineFlow = () => {
  const axiosInstance = useCustomAxios();
  const [sequences, setSequences] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [newSequence, setNewSequence] = useState({
    email: "",
    scheduleTime: "",
    nodes: [{ id: "1", data: "Start", position: { x: 0, y: 0 } }],
    emailTemplate: "",
  });
  const [currentSequence, setCurrentSequence] = useState<any>(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [sequenceToDelete, setSequenceToDelete] = useState<any>(null);

  // Fetch sequences
  const fetchSequences = async () => {
    try {
      const response = await axiosInstance.get("/emails/all");
      setSequences(response.data.sequences);
    } catch (error) {
      console.error("Error fetching sequences:", error);
    }
  };
  useEffect(() => {
    fetchSequences();
  }, [axiosInstance]);

  // Save new sequence
  const saveSequence = async () => {
    console.log(newSequence, "newSequence");

    // Find the selected template based on the user's choice
    const selectedTemplate = emailTemplates.find(
      (template) => template.value === newSequence.emailTemplate
    );
    console.log(selectedTemplate, newSequence, "newSequence");
    if (!selectedTemplate) {
      console.error("Selected email template not found");
      return;
    }

    const body = {
      email: newSequence.email,
      scheduleTime: newSequence.scheduleTime,
      nodes: newSequence.nodes,
      emailBody: selectedTemplate.body(newSequence.emailTemplate), // Dynamically render the body
    };

    try {
      const response = await axiosInstance.post("/emails/save", body);
      if (response.status === 201 || response.status === 200) {
        fetchSequences();
        setDialogOpen(false);

        setNewSequence({
          email: "",
          scheduleTime: "",
          nodes: [{ id: "1", data: "Start", position: { x: 0, y: 0 } }],
          emailTemplate: "",
        });
      }
    } catch (error) {
      console.error("Error saving sequence:", error);
    }
  };

  // Update existing sequence
  const updateSequence = async () => {
    try {
      const response = await axiosInstance.post(
        `/emails/save`,
        currentSequence
      );
      if (response.status === 200) {
        fetchSequences();
        setCurrentSequence(null);
        setEditDialogOpen(false);
      }
    } catch (error) {
      console.error("Error updating sequence:", error);
    }
  };

  // Delete sequence
  const deleteSequence = async (sequenceId: string) => {
    try {
      const response = await axiosInstance.post("/emails/delete", {
        sequenceId,
      });
      if (response.status === 200) {
        fetchSequences();
        setConfirmationOpen(false);
      }
      console.log("Sequence deleted successfully:", response.data);
    } catch (error) {
      console.error("Error deleting sequence:", error);
    }
  };

  const handleEdit = (sequence: any) => {
    setCurrentSequence(sequence);
    setEditDialogOpen(true);
  };

  const handleDelete = (sequence: any) => {
    setSequenceToDelete(sequence);
    setConfirmationOpen(true);
  };
  return {
    setDialogOpen,
    sequences,
    handleEdit,
    handleDelete,
    dialogOpen,
    saveSequence,
    newSequence,
    setNewSequence,
    sequenceToDelete,
    confirmationOpen,
    setConfirmationOpen,
    deleteSequence,
    currentSequence,
    editDialogOpen,
    updateSequence,
    setCurrentSequence,
    setEditDialogOpen,
  };
};

export default useTimelineFlow;
