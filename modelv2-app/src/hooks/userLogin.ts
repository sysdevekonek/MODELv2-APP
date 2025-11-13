import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import api from "../common/config";

export const userLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const handleClear = () => {
    setUsername('');
    setPassword('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getFirstAccessibleURL = (navList: any[]): string | null => {
    navList.sort((a, b) => a.DISPLAY_ORDER - b.DISPLAY_ORDER);
    for (const item of navList) {
      const isLeaf = !navList.some(nav => nav.PARENT_NAV_CODE === item.NAV_ITEM_CODE);
      if (item.URL && isLeaf) return item.URL;
    }
    return null;
  };

  const handleLogin = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!username || !password) {
      toast.error('Username and password are required');
      return;
    }

    setSubmitted(true);
    setLoading(true);

    try {
      const token = btoa(`${username}:${password}`);
      const res = await api.post('/auth/login', null, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });

      const accessToken = res.data.accessToken;
      const refreshToken = res.data.refreshToken;
      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('refreshToken', refreshToken);

      const userInfoRes = await api.get('/user/info');
      const userInfo = userInfoRes.data.USER_INFO;
      const navList = userInfoRes.data.NAV_LIST;

      sessionStorage.setItem('username', userInfo.USERNAME);
      sessionStorage.setItem('fullName', userInfo.FULLNAME);
      sessionStorage.setItem('userRoles', userInfo.ACCESS_PROFILE);
      sessionStorage.setItem('navigation', JSON.stringify(navList));
      
      const firstURL = getFirstAccessibleURL(navList);

      if (firstURL) {
        router.push(firstURL);
      } else {
        setLoading(false);
        toast.error('No accessible page found.');
      }

    } catch (err: any) {
      console.error('Login failed:', err.response?.data || err.message);

      if (err.response?.status === 401) {
        setError('Invalid username or password');
        toast.error('Invalid username or password');
      } else {
        setError('Login failed. Please try again.');
        toast.error("Something went wrong. Please try again.");
      }
      setLoading(false);
      setSubmitted(false);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    const navRaw = sessionStorage.getItem('navigation');

    if (token && navRaw) {
      const navList = JSON.parse(navRaw);
      const firstURL = getFirstAccessibleURL(navList);
      if (firstURL) router.push(firstURL);
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
    handleLogin,
    loading,
    submitted
  };
};