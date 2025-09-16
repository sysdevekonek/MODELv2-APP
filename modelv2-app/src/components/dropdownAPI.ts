"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import api from '../common/config';
import toast from 'react-hot-toast';

// Client & Role Dropdown
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

// Country Dropdown
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

// Department Dropdown
export const useDepartmentDropdown = () => {
  const [departmentDropdown, setDepartmentDropdown] = useState<{ DEPT_NAME: string; DEPT_CODE: string }[]>([]);
  const [selectedDepartment, setSelectedDepartment] = React.useState<string>("");
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

  return { departmentDropdown, setDepartmentDropdown, selectedDepartment, setSelectedDepartment, loading };
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

  const fetchConsolidator = useCallback(
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
        const res = await api.get("/search/consolidator", {
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
    },
    [pageSize]
  );

  const fetchNextPageConsi = useCallback(async () => {
    if (loading || !hasMore || !searchTerm) return;

    const nextPage = page + 1;
    const start = (nextPage - 1) * pageSize + 1;
    const end = nextPage * pageSize;

    setLoading(true);
    try {
      const res = await api.get("/search/consolidator", {
        params: { value: searchTerm, start, end },
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

  const fetchWarehouse = useCallback(
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
        const res = await api.get("/search/warehouse", {
          params: { value, start, end },
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
    },
    [pageSize]
  );

  const fetchNextPageWarehouse = useCallback(async () => {
    if (loading || !hasMore || !searchTerm) return;

    const nextPage = page + 1;
    const start = (nextPage - 1) * pageSize + 1;
    const end = nextPage * pageSize;

    setLoading(true);
    try {
      const res = await api.get("/search/warehouse", {
        params: { value: searchTerm, start, end },
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


// Consignee Dropdown
export const useConsigneeDropdown = () => {
  const pageSize = 10;

  const [items, setItems] = useState<{ CNEE_NAM: string; CNEE_COD: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(0); 
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConsignee, setSelectedConsignee] = React.useState<string>("");

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
    selectedConsignee,
    setSelectedConsignee,
    loading,
    hasMore,
    fetchConsignee,
    fetchNextPage, 
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

  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.get("/reference/templates/NSL"),
      api.get("/reference/sad/field/range?start=1&end=9999")
    ])
      .then(([templateRes, descRes]) => {
        setTemplateDropdown(templateRes.data || []);
        setDescValue(descRes.data || []);
      })
      .catch((err) => {
        console.error("Error fetching template data:", err);
        toast.error("Failed to load template data");
      })
      .finally(() => setLoading(false));
  }, []);

  return {
    templateDropdown,
    setTemplateDropdown,
    selectedTemplate,
    setSelectedTemplate,
    descValue,
    setDescValue,
    loading,
  };
};


export const useSADDropdown = () => {
  const pageSize = 10;

  const [items, setItems] = useState<{ PARAMETER_DESC: string; COLUMN_CODE: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(0); 
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSAD, setSelectedSAD] = React.useState<string>("");

  const fetchSAD = useCallback(
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
        const res = await api.get("/search/sad/field", {
          params: { value, start, end },
        });
        const data = res.data || [];
        setItems(data);
        setPage(1);
        setHasMore(data.length === pageSize);
      } catch (err) {
        console.error("SAD fetch error:", err);
        toast.error("Failed to load SAD");
      } finally {
        setLoading(false);
      }
    },
    [pageSize]
  );

  const fetchNextPageSAD = useCallback(async () => {
    if (loading || !hasMore || !searchTerm) return;

    const nextPage = page + 1;
    const start = (nextPage - 1) * pageSize + 1;
    const end = nextPage * pageSize;

    setLoading(true);
    try {
      const res = await api.get("/search/sad/field", {
        params: { value: searchTerm, start, end },
      });
      const data = res.data || [];
      setItems(prev => [...prev, ...data]);
      setPage(nextPage);
      setHasMore(data.length === pageSize);
    } catch (err) {
      console.error("SAD fetch error:", err);
      toast.error("Failed to load SAD");
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, searchTerm, page, pageSize]);

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



// Single API call (might consider)
// export const useConsigneeDropdown = () => {
//   const pageSize = 10;

//   const [items, setItems] = useState<{ CNEE_NAM: string; CNEE_COD: string }[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(false);
//   const [page, setPage] = useState(0);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedConsignee, setSelectedConsignee] = React.useState<string>("");

//   const fetchConsignee = useCallback(
//     async (term: string = searchTerm, reset = false) => {
//       const value = term.trim();

//       if (reset) {
//         setItems([]);
//         setPage(0);
//       }

//       if (!value) {
//         setItems([]);
//         setHasMore(false);
//         setPage(0);
//         setSearchTerm("");
//         return;
//       }

//       const nextPage = reset ? 1 : page + 1;
//       const start = (nextPage - 1) * pageSize + 1;
//       const end = nextPage * pageSize;

//       setLoading(true);
//       try {

//         const res = await api.get("/search/consignee", {
//           params: { value, start, end },
//         });

//         const data = res.data || [];
//         setItems(prev => (reset ? data : [...prev, ...data]));
//         setPage(nextPage);
//         setSearchTerm(value);
//         setHasMore(data.length === pageSize);
//       } catch (err) {
//         console.error("Consignee fetch error:", err);
//         toast.error("Failed to load consignees");
//       } finally {
//         setLoading(false);
//       }
//     },
//     [page, pageSize, searchTerm]
//   );

//   return {
//     consigneeDropdown: items,
//     selectedConsignee,
//     setSelectedConsignee,
//     loading,
//     hasMore,
//     fetchConsignee,
//   };
// };

