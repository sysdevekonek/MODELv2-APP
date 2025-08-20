"use client";

import { useEffect, useState, useCallback, useRef } from "react";
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

export const useConsigneeDropdown = () => {
  const pageSize = 10;

  const [items, setItems] = useState<{ CNEE_NAM: string; CNEE_COD: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(0); // 0 = nothing loaded yet
  const [searchTerm, setSearchTerm] = useState("");

  const fetchConsignee = useCallback(
    async (term: string, reset = true) => {
      const value = term.trim();
      setSearchTerm(value);

      if (!value) {
        // empty input: clear results & stop paging
        setItems([]);
        setHasMore(false);
        setPage(0);
        return;
      }

      setLoading(true);
      try {
        const start = 1;
        const end = pageSize;
        const res = await api.get("/search/consignee", {
          params: { value, start, end },
        });
        const data = res.data || [];
        setItems(data);
        setPage(1);
        setHasMore(data.length === pageSize);
      } catch (err) {
        console.error("Consignee fetch error:", err);
        toast.error("Failed to load consignees");
      } finally {
        setLoading(false);
      }
    },
    [pageSize]
  );

  const fetchNextPage = useCallback(async () => {
    if (loading || !hasMore || !searchTerm) return;

    const nextPage = page + 1;
    const start = (nextPage - 1) * pageSize + 1;
    const end = nextPage * pageSize;

    setLoading(true);
    try {
      const res = await api.get("/search/consignee", {
        params: { value: searchTerm, start, end },
      });
      const data = res.data || [];
      setItems(prev => [...prev, ...data]);
      setPage(nextPage);
      setHasMore(data.length === pageSize);
    } catch (err) {
      console.error("Consignee fetch error:", err);
      toast.error("Failed to load consignees");
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, searchTerm, page, pageSize]);

  return {
    consigneeDropdown: items,
    loading,
    hasMore,
    fetchConsignee,
    fetchNextPage, // <-- no args needed now
  };
};