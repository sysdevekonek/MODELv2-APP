import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import api from "../common/config";

export const userLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleClear = () => {
    setUsername('');
    setPassword('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getFirstAccessibleURL = (navList: any[]): string | null => {
    // Optionally sort by DISPLAY_ORDER first
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

    const loadingToast = toast.loading('Logging in...');
    const token = btoa(`${username}:${password}`);

    try {
      const res = await api.post('/auth/login', null, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });

      const accessToken = res.data.accessToken;
      sessionStorage.setItem('accessToken', accessToken);

      const userInfoRes = await api.get('/user/info');
      const userInfo = userInfoRes.data.USER_INFO;
      const navList = userInfoRes.data.NAV_LIST;

      sessionStorage.setItem('username', userInfo.USERNAME);
      sessionStorage.setItem('userRoles', userInfo.ACCESS_PROFILE);
      sessionStorage.setItem('navigation', JSON.stringify(navList));

      const firstURL = getFirstAccessibleURL(navList);
      toast.dismiss(loadingToast);
      toast.success('Login successful');

      if (firstURL) {
        router.push(firstURL);
      } else {
        toast.error('No accessible page found.');
      }

      console.log('User access profile:', userInfo.ACCESS_PROFILE);
    } catch (err: any) {
      console.error('Login failed:', err.response?.data || err.message);
      toast.error(err.response?.data?.message || 'Login failed');
      toast.dismiss(loadingToast);
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
  };
};
