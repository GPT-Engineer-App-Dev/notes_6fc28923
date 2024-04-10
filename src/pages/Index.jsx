import React, { useState } from "react";
import { Box, VStack, HStack, IconButton, Input, Textarea, useToast, Heading, Container, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const toast = useToast();

  const handleAddNote = () => {
    if (newNote.title || newNote.content) {
      setNotes([...notes, newNote]);
      setNewNote({ title: "", content: "" });
      toast({
        title: "Note added.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleDeleteNote = (index) => {
    const newNotes = notes.filter((_, noteIndex) => noteIndex !== index);
    setNotes(newNotes);
    toast({
      title: "Note deleted.",
      status: "warning",
      duration: 2000,
      isClosable: true,
    });
  };

  const noteBgColor = useColorModeValue("gray.100", "gray.700");

  return (
    <Container maxW="container.md" pt={5}>
      <VStack spacing={4}>
        <Heading mb={6}>Note Keeper</Heading>
        <HStack>
          <Input placeholder="Title" value={newNote.title} onChange={(e) => setNewNote({ ...newNote, title: e.target.value })} />
          <IconButton icon={<FaPlus />} onClick={handleAddNote} aria-label="Add note" />
        </HStack>
        <Textarea placeholder="Take a note..." value={newNote.content} onChange={(e) => setNewNote({ ...newNote, content: e.target.value })} />
      </VStack>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5} py={5}>
        {notes.map((note, index) => (
          <Box key={index} p={4} bg={noteBgColor} borderRadius="md" shadow="base">
            <VStack align="stretch" spacing={3}>
              <HStack justifyContent="space-between">
                <Heading size="sm">{note.title}</Heading>
                <IconButton icon={<FaTrash />} size="sm" aria-label="Delete note" onClick={() => handleDeleteNote(index)} />
              </HStack>
              <Box>
                {note.content.split("\n").map((line, lineIndex) => (
                  <Text key={lineIndex}>{line}</Text>
                ))}
              </Box>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Index;
