import React, { useState, useEffect, useRef } from 'react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { sanitizeText } from '../lib/sanitize';
import apiService from '../services/apiService';
import useStore from '../context/store';
import { toast } from 'sonner';

const UserSearchInput = ({ onUserSelect, selectedUser }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useStore();
  const debounceTimeoutRef = useRef(null);

  useEffect(() => {
    const sanitizedQuery = sanitizeText(query);
    if (sanitizedQuery.length > 2) {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      debounceTimeoutRef.current = setTimeout(() => {
        searchUsers(sanitizedQuery);
      }, 500);
    } else {
      setUsers([]);
    }
  }, [query, token]);

  const searchUsers = async (searchQuery) => {
    setLoading(true);
    try {
      // Additional sanitization before sending to API
      const sanitizedSearchQuery = encodeURIComponent(sanitizeText(searchQuery));
      const response = await apiService.get(`/users/search?query=${sanitizedSearchQuery}`, token);
      setUsers(response);
    } catch (err) {
      const errorMessage = err.data?.message || err.message || 'Failed to search users';
      toast.error(errorMessage);
      console.error(err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedUser
            ? selectedUser.username
            : "Select user..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search user..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            {loading && <CommandEmpty>Searching...</CommandEmpty>}
            {!loading && users.length === 0 && query.length > 2 && <CommandEmpty>No user found.</CommandEmpty>}
            <CommandGroup>
              {users.map((user) => (
                <CommandItem
                  key={user._id}
                  value={user.username}
                  onSelect={() => {
                    onUserSelect(user);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedUser && selectedUser._id === user._id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {user.username} ({user.email})
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default UserSearchInput;


