import { useEffect, useState } from "react";
import useCustomAxios from "../../../../services/api/customAxios";
import { emailTemplates } from "../components/mailTemplates/emailTemplates";
import { NewSequence, Sequence } from "../types/FlowTypes";
import { useToastStore } from "../../../../services/store/snackbar/toastStore";

// Define types for the API response and state structures

interface FetchSequencesResponse {
  success: boolean;
  sequences: Sequence[];
}

const useTimelineFlow = () => {
  const axiosInstance = useCustomAxios();
  const { showToast } = useToastStore();
  const [sequences, setSequences] = useState<Sequence[]>([]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [newSequence, setNewSequence] = useState<NewSequence>({
    email: "",
    scheduleTime: "",
    nodes: [{ id: "1", data: "Start", position: { x: 0, y: 0 } }],
    emailTemplate: "",
  });
  const [currentSequence, setCurrentSequence] = useState<Sequence | null>(null);
  const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false);
  const [sequenceToDelete, setSequenceToDelete] = useState<Sequence | null>(
    null
  );

  // Fetch sequences
  const fetchSequences = async () => {
    try {
      const response = await axiosInstance.get<FetchSequencesResponse>(
        "/emails/all"
      );
      const transformedSequences = response.data.sequences.map((seq) => ({
        ...seq,
        id: seq._id, // Add `id` as an alias for `_id`
      }));
      setSequences(transformedSequences);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error fetching sequences:", error.message);
      } else {
        console.error("Unknown error fetching sequences");
      }
    }
  };

  useEffect(() => {
    fetchSequences();
  }, [axiosInstance]);

  // Save new sequence
  const saveSequence = async () => {
    const selectedTemplate = emailTemplates.find(
      (template) => template.value === newSequence.emailTemplate
    );

    if (!selectedTemplate) {
      console.error("Selected email template not found");
      return;
    }

    const emailBody = selectedTemplate.body(newSequence.emailTemplate);

    const body = {
      email: newSequence.email,
      scheduleTime: newSequence.scheduleTime,
      nodes: newSequence.nodes,
      emailBody,
    };

    try {
      const response = await axiosInstance.post<FetchSequencesResponse>(
        "/emails/save",
        body
      );
      if (response.status === 201 || response.status === 200) {
        fetchSequences();
        showToast("New sequence is Created", "success");
        setDialogOpen(false);
        // Reset the new sequence state
        setNewSequence({
          email: "",
          scheduleTime: "",
          nodes: [{ id: "1", data: "Start", position: { x: 0, y: 0 } }],
          emailTemplate: "",
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error saving sequence:", error.message);
      } else {
        console.error("Unknown error saving sequence");
      }
    }
  };

  // Update existing sequence
  const updateSequence = async () => {
    if (!currentSequence) return;

    try {
      const response = await axiosInstance.post<FetchSequencesResponse>(
        "/emails/save",
        currentSequence
      );
      if (response.status === 200) {
        fetchSequences();
        showToast("Sequence is updated", "success");
        setCurrentSequence(null);
        setEditDialogOpen(false);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error updating sequence:", error.message);
      } else {
        console.error("Unknown error updating sequence");
      }
    }
  };

  // Delete sequence
  const deleteSequence = async (sequenceId: string) => {
    try {
      const response = await axiosInstance.post<{
        success: boolean;
        message: string;
      }>("/emails/delete", { sequenceId });
      if (response.status === 200) {
        fetchSequences();
        showToast("Sequence is deleted", "success");
        setConfirmationOpen(false);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error deleting sequence:", error.message);
      } else {
        console.error("Unknown error deleting sequence");
      }
    }
  };

  const handleEdit = (sequence: Sequence) => {
    setCurrentSequence(sequence);
    setEditDialogOpen(true);
  };

  const handleDelete = (sequence: Sequence) => {
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
