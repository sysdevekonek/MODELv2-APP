import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast'

import api from "../common/config";

export const userLogin = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()

    const handleClear = () => {
        setUsername("")
        setPassword("")
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const handleLogin = async (e?: React.FormEvent) => {
    e?.preventDefault(); 
    
    console.log('🔵 Login button clicked');
    
    if (!username || !password) {
      toast.error('Username and password are required');
      return;
    }

    const token = btoa(`${username}:${password}`);

    try {
      const res = await api.post('/auth/login', null, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });
      toast.success('Login successful');
      sessionStorage.setItem('accessToken', res.data.accessToken);
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Login failed:', err.response?.data || err.message);
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    if (token) {
      router.push('/dashboard');
    }
  }, []);

    return {
        username,
        setUsername,
        password,
        setPassword,
        error,
        setError,
        showPassword,
        setShowPassword,
        handleClear,
        togglePasswordVisibility,
        handleLogin
    };
}
