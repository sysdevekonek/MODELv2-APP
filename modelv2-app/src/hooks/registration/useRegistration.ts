import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/common/config";
import { toast } from "react-hot-toast";
import { useRegistrationContext } from "@/hooks/registration/RegistrationContext";

export function useRegistration() {
  const { userData, clearData } = useRegistrationContext();
  const [usernameChecker, setUsernameChecker] = useState<"Valid" | "Invalid" | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const checkUsername = async (username: string) => {
    if (!username) {
      setUsernameChecker(null);
      return;
    }
    try {
      const res = await api.get("/utilities/registration/check/username", {
        params: { value: username },
      });
      setUsernameChecker(res.data.STATUS);
    } catch (err) {
      console.error("Username check failed:", err);
      setUsernameChecker(null);
    }
  };

  const TEST_MODE = false; //turn true for testing 

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    const payload = Object.fromEntries(
      Object.entries(userData).map(([key, value]) => {
        if (key === "properties") {
          return [key, (value as { name: string; value: string }[])];
        }
        if (Array.isArray(value)) {
          return [key, value.length > 0 ? value.join(",") : null];
        }
        if (typeof value === "boolean") {
          return [key, value ? 1 : 0];
        }
        if (typeof value === "string") {
          return [key, value.trim()];
        }
        return [key, value];
      })
    );

    try {
      //If TEST_MODE is true, if(TEST_MODE) will run
      if (TEST_MODE) {
        toast.success("User registered successfully! (test)", {
          duration: 3500,
        });
        clearData();

        setTimeout(() => { router.refresh(); }, 5500);

        return { mock: true };
      }

      const res = await api.post("/user/create", payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (!res.data) throw new Error(`Error ${res.status}`);

      toast.success("User registered successfully!", { duration: 3500 });
      clearData();

      return true;

    } catch (err: any) {
      setError(err.message || "Registration error");
      toast.error("Failed to register user");
      throw err;
    } finally {
      setLoading(false);
    }
  };


  return { handleSubmit, loading, error, checkUsername, usernameChecker };
}
