"use client";

import { useEffect, useState, useCallback } from "react";
import api from "../common/config";
import toast from "react-hot-toast";

//
let cachedClients:
  | { CLIENT_NAME: string; CLIENT_CODE: string }[]
  | undefined;
let cachedProfiles:
  | { PROFILE_NAME: string; PROFILE_CODE: string }[]
  | undefined;

export const useClientRoleDropdown = () => {
  const [clientDropdown, setClientDropdown] = useState(cachedClients ?? []);
  const [profileDropdown, setProfileDropdown] = useState(cachedProfiles ?? []);
  const [loading, setLoading] = useState(!cachedClients || !cachedProfiles);

  useEffect(() => {
    if (!cachedClients || !cachedProfiles) {
      setLoading(true);
      Promise.all([
        api.get("/reference/clients/all"),
        api.get("/reference/profile/all"),
      ])
        .then(([clientsResponse, profileResponse]) => {
          cachedClients = clientsResponse.data || [];
          cachedProfiles = profileResponse.data || [];
          setClientDropdown(cachedClients ?? []);
          setProfileDropdown(cachedProfiles ?? []);
        })
        .catch((err) => {
          console.error("Error fetching client or role dropdown data:", err);
          toast.error("Failed to load client or role data");
        })
        .finally(() => setLoading(false));
    }
  }, []);

  return { clientDropdown, setClientDropdown, profileDropdown, setProfileDropdown, loading };
};

//
let cachedCountries:
  | { COUNTRY_CODE: string; COUNTRY_NAME: string }[]
  | undefined;

export const useCountryDropdown = () => {
  const [countryDropdown, setCountryDropdown] = useState( cachedCountries ?? [] );
  const [loading, setLoading] = useState(!cachedCountries);

  useEffect(() => {
    if (!cachedCountries) {
      setLoading(true);
      api
        .get("/reference/country/all")
        .then((res) => {
          cachedCountries = res.data || [];
          setCountryDropdown(cachedCountries ?? []);
        })
        .catch((err) => {
          console.error("Country list fetch error:", err);
          toast.error("Failed to load countries");
        })
        .finally(() => setLoading(false));
    }
  }, []);

  return { countryDropdown, setCountryDropdown, loading };
};

//
let cachedDepartments:
  | { DEPT_NAME: string; DEPT_CODE: string }[]
  | undefined;

export const useDepartmentDropdown = () => {
  const [departmentDropdown, setDepartmentDropdown] = useState( cachedDepartments ?? [] );
  const [loading, setLoading] = useState(!cachedDepartments);

  useEffect(() => {
    if (!cachedDepartments) {
      setLoading(true);
      api
        .get("/reference/department/all")
        .then((res) => {
          cachedDepartments = res.data || [];
          setDepartmentDropdown(cachedDepartments ?? []);
        })
        .catch((err) => {
          console.error("Department list fetch error:", err);
          toast.error("Failed to load departments");
        })
        .finally(() => setLoading(false));
    }
  }, []);

  return { departmentDropdown, setDepartmentDropdown, loading };
};

//
const consigneeCache: Record<string,{ items: { CNEE_NAM: string; CNEE_COD: string }[]; page: number; hasMore: boolean }> = {};

export const useConsigneeDropdown = () => {
  const pageSize = 10;

  const [items, setItems] = useState<{ CNEE_NAM: string; CNEE_COD: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchConsignee = useCallback(
    async (term: string, reset = true) => {
      const value = term.trim();
      setSearchTerm(value);

      if (!value) {
        setItems([]);
        setHasMore(false);
        setPage(0);
        return;
      }

      if (reset && consigneeCache[value]) {
        setItems(consigneeCache[value].items);
        setHasMore(consigneeCache[value].hasMore);
        setPage(consigneeCache[value].page);
        return;
      }

      setLoading(true);
      try {
        const start = 1;
        const end = pageSize;
        const res = await api.get("/search/consignee", {
          params: { value, start, end },
        });
        const data = (res.data || []) as { CNEE_NAM: string; CNEE_COD: string }[];
        setItems(data);
        setPage(1);
        setHasMore(data.length === pageSize);

        consigneeCache[value] = { items: data, page: 1, hasMore: data.length === pageSize };
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
      const data = (res.data || []) as { CNEE_NAM: string; CNEE_COD: string }[];
      const newItems = [...items, ...data];
      setItems(newItems);
      setPage(nextPage);
      setHasMore(data.length === pageSize);

      consigneeCache[searchTerm] = { items: newItems, page: nextPage, hasMore: data.length === pageSize };
    } catch (err) {
      console.error("Consignee fetch error:", err);
      toast.error("Failed to load consignees");
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, searchTerm, page, pageSize, items]);

  return { consigneeDropdown: items, loading, hasMore, fetchConsignee, fetchNextPage };
};
