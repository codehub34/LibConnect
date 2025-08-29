import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useBusinessFilter = (businesses) => {
  const [searchParams] = useSearchParams();
  const [filteredAndSortedBusinesses, setFilteredAndSortedBusinesses] = useState([]);

  useEffect(() => {
    let filtered = [...businesses];
    const categoryFilter = searchParams.get('category');
    const locationFilter = searchParams.get('location');
    const searchFilter = searchParams.get('search');
    const sortField = searchParams.get('sortBy') || 'name';
    const sortDirection = searchParams.get('sortOrder') || 'asc';

    // Apply filtering
    if (searchFilter) {
      filtered = filtered.filter(business =>
        business.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
        business.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
        business.category.toLowerCase().includes(searchFilter.toLowerCase())
      );
    }
    if (categoryFilter) {
      filtered = filtered.filter(business => business.category === categoryFilter);
    }
    if (locationFilter) {
      filtered = filtered.filter(business => business.location === locationFilter);
    }

    // Apply sorting
    const sorted = filtered.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (sortField === 'rating' || sortField === 'reviewCount') {
        aVal = parseFloat(aVal);
        bVal = parseFloat(bVal);
      }
      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    setFilteredAndSortedBusinesses(sorted);
  }, [businesses, searchParams]);

  return filteredAndSortedBusinesses;
};