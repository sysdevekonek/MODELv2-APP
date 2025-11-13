"use client";

import React, { useEffect, useState, useCallback, useRef, cache } from "react";
import api from '../common/config';
import toast from 'react-hot-toast';
import { debounce } from "lodash";

// Client and Profile Dropdown
let cachedClients: { CLIENT_NAME: string; CLIENT_CODE: string }[] | undefined;
let cachedProfiles:{ PROFILE_NAME: string; PROFILE_CODE: string }[] | undefined;

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

  const clientRoleChange = (value: string) => {
    if (!cachedClients || !cachedProfiles) return;
    const query = value.trim().toLowerCase();
    if(!query || query === "all"){
      setClientDropdown(cachedClients);
      setProfileDropdown(cachedProfiles);
      return;
    }
    const filteredClients = cachedClients.filter((item) =>
      item.CLIENT_CODE?.toLowerCase().includes(query) ||
      item.CLIENT_NAME?.toLowerCase().includes(query)
    );
    const filteredProfiles = cachedProfiles.filter((item) =>
      item.PROFILE_CODE?.toLowerCase().includes(query) ||
      item.PROFILE_NAME?.toLowerCase().includes(query)
    );
    setClientDropdown(filteredClients);
    setProfileDropdown(filteredProfiles);
  }

  return { clientDropdown, profileDropdown, loading, clientRoleChange };
};

// Country Dropdown
let cachedCountries: { COUNTRY_CODE: string; COUNTRY_NAME: string }[] | undefined;

export const useCountryDropdown = () => {
  const [countryDropdown, setCountryDropdown] = useState( cachedCountries ?? []);
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

  const countriesChange = (value: string) => {
    if (!cachedCountries) return;

    const query = value.trim().toLowerCase();
    if(!query || query === "all"){
      setCountryDropdown(cachedCountries);
      return;
    }

    const filtered = cachedCountries.filter(country => 
      country.COUNTRY_NAME.toLowerCase().includes(query) || 
      country.COUNTRY_CODE.toLowerCase().includes(query)
    );
    setCountryDropdown(filtered);
  }

  return { countryDropdown, setCountryDropdown, loading, countriesChange };
};

// Department Dropdown
let cachedDepartments: { DEPT_NAME: string; DEPT_CODE: string }[] | undefined;

export const useDepartmentDropdown = () => {
  const [departmentDropdown, setDepartmentDropdown] = useState(cachedDepartments ?? []);
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

  const departmentChange = (value: string) => {
    if (!cachedDepartments) return;
    
    const query = value.trim().toLowerCase();
    if (!query || query === "all") {
      setDepartmentDropdown(cachedDepartments);
      return;
    }

    const filtered = cachedDepartments.filter(dept => 
      dept.DEPT_NAME.toLowerCase().includes(query) || 
      dept.DEPT_CODE.toLowerCase().includes(query)
    );
    setDepartmentDropdown(filtered);
  };

  return { departmentDropdown, loading, departmentChange };
};

// Consignee Dropdown
const consigneeCache: Record<string, {
  items: { CNEE_NAM: string; CNEE_COD: string }[];
  page: number;
  hasMore: boolean;
}> = {};

export const useConsigneeDropdown = () => {
  const pageSize = 10;
  const [items, setItems] = useState<{ CNEE_NAM: string; CNEE_COD: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!consigneeCache["ALL"]) {
      fetchConsignee("ALL", true);
    }
  }, []);

  const fetchConsignee = useCallback(async (term: string, reset = true) => {
    const searchValue = term.trim() || "ALL";
    setSearchTerm(searchValue);

    // Return cached data if available
    if (reset && consigneeCache[searchValue]) {
      const cached = consigneeCache[searchValue];
      setItems(cached.items);
      setHasMore(cached.hasMore);
      setCurrentPage(cached.page);
      return;
    }

    setLoading(true);
    try {
      const start = 1;
      const end = pageSize;
      const res = await api.get("/reference/consignees/range", {
        params: { value: searchValue, start, end },
      });

      const data = res.data || [];
      const more = data.length === pageSize;

      if (reset) {
        setItems(data);
        setCurrentPage(1);
      } else {
        setItems(prev => [...prev, ...data]);
      }

      setHasMore(more);

      consigneeCache[searchValue] = {
        items: reset ? data : [...(consigneeCache[searchValue]?.items || []), ...data],
        page: reset ? 1 : currentPage + 1,
        hasMore: more,
      };
    } catch (err) {
      console.error("Consignee fetch error:", err);
      toast.error("Failed to load consignees");
    } finally {
      setLoading(false);
    }
  }, [pageSize, currentPage]);

  const fetchNextPage = useCallback(async () => {
    if (!hasMore || loading || !searchTerm) return;

    const nextPage = currentPage + 1;
    const start = (nextPage - 1) * pageSize + 1;
    const end = nextPage * pageSize;

    setLoading(true);
    try {
      const res = await api.get("/reference/consignees/range", {
        params: { value: searchTerm, start, end },
      });

      const data = res.data || [];
      const more = data.length === pageSize;

      setItems(prev => [...prev, ...data]);
      setCurrentPage(nextPage);
      setHasMore(more);

      if (consigneeCache[searchTerm]) {
        consigneeCache[searchTerm] = {
          items: [...consigneeCache[searchTerm].items, ...data],
          page: nextPage,
          hasMore: more,
        };
      }
    } catch (err) {
      console.error("Consignee pagination error:", err);
      toast.error("Failed to load more consignees");
    } finally {
      setLoading(false);
    }
  }, [hasMore, loading, searchTerm, currentPage, pageSize]);

  const clearItems = useCallback(() => {
    setItems([]);
    setHasMore(false);
    setCurrentPage(0);
    setSearchTerm("");
  }, []);

  return { consigneeDropdown: items, fetchConsignee, fetchNextPage, clearItems,  loading,  hasMore };
};

// Consolidator Dropdown
export const useConsolidatorDropdown = () => {
  const pageSize = 10;

  const [items, setItems] = useState<{ NAME: string; CODE: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(0); 
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConsolidator, setSelectedConsolidator] = React.useState<string>("");

  const fetchConsolidator = useCallback(async (term: string, reset = true) => {
    let value = term.trim() || "ALL"; // allow default
    setSearchTerm(value);
  
    setLoading(true);
    try {
      const start = 1;
      const end = pageSize;
      const res = await api.get("/reference/consolidators/range", {
        params: { value, start, end },
      });
      const data = res.data || [];
      setItems(data);
      setPage(1);
      setHasMore(data.length === pageSize);
    } catch (err) {
      console.error("Consolidator fetch error:", err);
      toast.error("Failed to load Consolidator");
    } finally {
      setLoading(false);
    }
  }, [pageSize]);
  
  useEffect(() => {
    fetchConsolidator("ALL", true);
  }, [fetchConsolidator]);
  

  const fetchNextPageConsi = useCallback(async () => {
    if (loading || !hasMore || !searchTerm) return;

    const nextPage = page + 1;
    const start = (nextPage - 1) * pageSize + 1;
    const end = nextPage * pageSize;

    setLoading(true);
    try {
      const res = await api.get("/reference/consolidators/range", {
        params: {
          value: searchTerm.length === 0 ? "all" : searchTerm,
          start,
          end },
      });
      const data = res.data || [];
      setItems(prev => [...prev, ...data]);
      setPage(nextPage);
      setHasMore(data.length === pageSize);
    } catch (err) {
      console.error("Consolidator fetch error:", err);
      toast.error("Failed to load Consolidator");
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, searchTerm, page, pageSize]);

  return {
    consolidatorDropdown: items,
    selectedConsolidator,
    setSelectedConsolidator,
    loading,
    hasMore,
    fetchConsolidator,
    fetchNextPageConsi, 
  };
};

// Warehouse Dropdown
export const useWarehouseDropdown = () => {
  const pageSize = 10;

  const [items, setItems] = useState<{ NAME: string; CODE: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(0); 
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = React.useState<string>("");

  const fetchWarehouse = useCallback(async (term: string, reset = true) => {
    let value = term.trim() || "ALL"; // allow default
      setSearchTerm(value);

      setLoading(true);
      try {
        const start = 1;
        const end = pageSize;
        const res = await api.get("/reference/warehouse/range", {
          params: { 
            value: value.length === 0 ? "all" : value,
            start,
            end
          },
        });
        const data = res.data || [];
        setItems(data);
        setPage(1);
        setHasMore(data.length === pageSize);
      } catch (err) {
        console.error("warehouse fetch error:", err);
        toast.error("Failed to load warehouse");
      } finally {
        setLoading(false);
      }
    }, [pageSize]);
  
    useEffect(() => {
      fetchWarehouse("ALL", true);
    }, [fetchWarehouse]);

  const fetchNextPageWarehouse = useCallback(async () => {
    if (loading || !hasMore || !searchTerm) return;

    const nextPage = page + 1;
    const start = (nextPage - 1) * pageSize + 1;
    const end = nextPage * pageSize;

    setLoading(true);
    try {
      const res = await api.get("/reference/warehouse/range", {
        params: { 
          value: searchTerm.length === 0 ? "all" : searchTerm,
          start,
          end },
      });
      const data = res.data || [];
      setItems(prev => [...prev, ...data]);
      setPage(nextPage);
      setHasMore(data.length === pageSize);
    } catch (err) {
      console.error("warehouse fetch error:", err);
      toast.error("Failed to load warehouse");
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, searchTerm, page, pageSize]);

  return {
    warehouseDropdown: items,
    selectedWarehouse,
    setSelectedWarehouse,
    loading,
    hasMore,
    fetchWarehouse,
    fetchNextPageWarehouse, 
  };
};

// Template Dropdown
export const useTemplateDropdown = () => {
  const [templateDropdown, setTemplateDropdown] = useState<
    { TEMPLATE_NAME: string; TEMPLATE_ID: string; COLUMNS: number; TEMPLATE_CODE: string }[]
  >([]);
  
  const [descValue, setDescValue] = useState<
    { PARAMETER_CODE: string; PARAMETER_DESC: string; COLUMN_CODE: string }[]
  >([]);

  const [selectedTemplate, setSelectedTemplate] = React.useState<string>("");
  const [loading, setLoading] = useState(false);

  const fetchTemplateDropdown = async () => {
    setLoading(true);
    try {
      const [templateRes, descRes] = await Promise.all([
        api.get("/reference/templates/NSL"),
        api.get("/reference/sad/field/range", {
          params: { value: "all", start: 1, end: 9999 },
        }),
      ]);
      setTemplateDropdown(templateRes.data || []);
      setDescValue(descRes.data || []);
    } catch (err) {
      console.error("Error fetching template data:", err);
      toast.error("Failed to load template data");
    } finally {
      setLoading(false);
    }
  };

  // initial fetch
  useEffect(() => {
    fetchTemplateDropdown();
  }, []);

  return {
    templateDropdown,
    setTemplateDropdown,
    selectedTemplate,
    setSelectedTemplate,
    descValue,
    setDescValue,
    loading,
    fetchTemplateDropdown,
  };
};

let sadCache: {
  items: { PARAMETER_DESC: string; COLUMN_CODE: string }[];
  hasMore: boolean;
  initialized: boolean;
} = {
  items: [],
  hasMore: false,
  initialized: false,
};

export const useSADDropdown = () => {
  const pageSize = 10;

  const [items, setItems] = useState<{ PARAMETER_DESC: string; COLUMN_CODE: string }[]>(sadCache.items);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(sadCache.hasMore);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("ALL");
  const [selectedSAD, setSelectedSAD] = useState<string>("");

  // Preload function – only runs once globally
  const preloadSAD = useCallback(async () => {
    if (sadCache.initialized) return; 
    setLoading(true);
    try {
      const res = await api.get("/reference/sad/field/range", {
        params: { value: "ALL", start: 1, end: pageSize },
      });
      const data = res.data || [];
      sadCache = { items: data, hasMore: data.length === pageSize, initialized: true };
      setItems(data);
      setHasMore(data.length === pageSize);
      setPage(1);
    } catch (err) {
      console.error("SAD preload error:", err);
      toast.error("Failed to load SAD data");
    } finally {
      setLoading(false);
    }
  }, [pageSize]);

  // Debounced fetch for search
  const debouncedFetchSAD = useRef(
    debounce(async (term: string) => {
      const value = term.trim() || "ALL";
      setLoading(true);
      try {
        const res = await api.get("/reference/sad/field/range", {
          params: { value, start: 1, end: pageSize },
        });
        const data = res.data || [];
        setItems(data);
        setPage(1);
        setHasMore(data.length === pageSize);
      } catch (err) {
        console.error("SAD search error:", err);
      } finally {
        setLoading(false);
      }
    }, 400)
  ).current;

  const fetchSAD = useCallback((term: string) => {
    setSearchTerm(term);
    debouncedFetchSAD(term); // Don't set loading here
  }, [debouncedFetchSAD]);
  

  const fetchNextPageSAD = useCallback(async () => {
    if (loading || !hasMore) return;

    const nextPage = page + 1;
    const start = (nextPage - 1) * pageSize + 1;
    const end = nextPage * pageSize;

    setLoading(true);
    try {
      const res = await api.get("/reference/sad/field/range", {
        params: { value: searchTerm, start, end },
      });
      const data = res.data || [];
      setItems(prev => [...prev, ...data]);
      setPage(nextPage);
      setHasMore(data.length === pageSize);
    } catch (err) {
      console.error("SAD pagination error:", err);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, searchTerm, page, pageSize]);

  // Preload on first hook usage
  useEffect(() => {
    preloadSAD();
  }, [preloadSAD]);

  useEffect(() => {
    return () => {
      debouncedFetchSAD.cancel?.(); // cancel pending debounce to avoid memory leaks
    };
  }, []);

  return {
    SADDropdown: items,
    selectedSAD,
    setSelectedSAD,
    loading,
    hasMore,
    fetchSAD,
    fetchNextPageSAD,
  };
};