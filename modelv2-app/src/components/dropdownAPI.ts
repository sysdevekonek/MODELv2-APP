"use client";

import { useState, useEffect } from 'react';
import api from '../common/config'
import toast from 'react-hot-toast';

//
export const useClientRoleDropdown = () => {
  const [clientDropdown, setClientDropdown] = useState<{ CLIENT_NAME: string; CLIENT_CODE: string }[]>([]);
  const [roleDropdown, setRoleDropdown] = useState<{ PROFILE_NAME: string; PROFILE_CODE: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDropdowns = async () => {
      setLoading(true);
      try {
        const [clientsResponse, roleResponse] = await Promise.all([
          api.get("/reference/clients/all"),
          api.get("/reference/profile/all")
        ]);

        // No need to dig into .data.clients — it's already the array
        setClientDropdown(clientsResponse.data || []);
        setRoleDropdown(roleResponse.data || []);
      } catch (err) {
        console.error("Error fetching client or role dropdown data:", err);
        toast.error("Failed to load client or role data");
      } finally {
        setLoading(false);
      }
    };

    fetchDropdowns();
  }, []);

  return { clientDropdown, setClientDropdown, roleDropdown, setRoleDropdown, loading };
}


//
export const useCountryDropdown = () => {
  const [countryDropdown, setCountryDropdown] = useState<{ COUNTRY_CODE: string; COUNTRY_NAME: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get("/reference/country/all")
      .then(res => setCountryDropdown(res.data || []))
      .catch(err => {
        console.error("Country list fetch error:", err);
        toast.error("Failed to load countries");
      })
      .finally(() => setLoading(false));
  }, []);

  return { countryDropdown, setCountryDropdown, loading };
};

//
export const useDepartmentDropdown = () => {
  const [departmentDropdown, setDepartmentDropdown] = useState<{ DEPT_NAME: string; DEPT_CODE: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get('/reference/department/all')
      .then(res => setDepartmentDropdown(res.data || []))
      .catch(err => {
        console.error("Department list fetch error:", err);
        toast.error("Failed to load countries");
      })
      .finally(() => setLoading(false));
  }, []);

  return { departmentDropdown, setDepartmentDropdown, loading };
};

//
export const useConsigneeDropdown = () => {
  const [consigneeDropdown, setConsigneeDropdown] = useState<{ CNEE_NAM: string; CNEE_COD: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchConsignee = async (searchValue: string) => {
    if (!searchValue.trim()) {
      setConsigneeDropdown([]); // clear if no input
      return;
    }
    setLoading(true);
    try {
      const res = await api.get('/search/consignee', { params: { value: searchValue } });
      setConsigneeDropdown(res.data || []);
    } catch (err) {
      console.error("Consignee fetch error:", err);
      toast.error("Failed to load consignees");
    } finally {
      setLoading(false);
    }
  };

  return { consigneeDropdown, loading, fetchConsignee };
};
