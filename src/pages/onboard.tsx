import {
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

import { BASE_URL } from "lib/constants/routes";

export default function Onboard() {
  const toast = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [notifyMe, setNotifyMe] = useState(true);
  const [twitterHandle, setTwitterHandle] = useState("");
  const onSave = async () => {
    setIsSubmitting(true);
    const result = await fetch("/api/on-board-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ handle: twitterHandle, notifyMe }),
    });
    if (!result.ok) {
      toast({
        title: "Error",
        description: (await result.json()).error,
        status: "error",
        duration: 6000,
        isClosable: true,
      });
      setIsSubmitting(false);
      return;
    }
    if (router.query.redirect) {
      router.push(new URL(router.query.redirect as string, BASE_URL));
    }
    toast({
      title: "Success!",
      description: "Details Updated",
      status: "success",
      duration: 6000,
      isClosable: true,
    });
    setSubmitted(true);
    setIsSubmitting(false);
  };

  return (
    <Stack py={5} gap={8}>
      <Heading>Your Details</Heading>
      <FormControl>
        <FormLabel>Twitter Handle or Project Website</FormLabel>
        <Input
          type="text"
          value={twitterHandle}
          placeholder="@curd_inc"
          onChange={(e) => {
            setTwitterHandle(e.target.value);
          }}
        />
        <FormHelperText>
          This will be displayed to when you&apos;re on the score board!
        </FormHelperText>
      </FormControl>
      <FormControl>
        <Checkbox
          isChecked={notifyMe}
          onChange={(e) => {
            setNotifyMe(e.target.checked);
          }}
        >
          Notify me on future game events!
        </Checkbox>
        <FormHelperText>
          We&apos;ll contact you from the detail above
        </FormHelperText>
      </FormControl>
      <Button
        isLoading={isSubmitting}
        loadingText="Submitting"
        onClick={onSave}
        isDisabled={!twitterHandle.trim() || submitted}
      >
        {submitted ? "Saved" : "Save"}
      </Button>
    </Stack>
  );
}
