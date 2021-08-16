import React from "react";
import FormControl from "react-bootstrap/FormControl";

type SearchProps = {
  onChange: (value: string) => void;
};

const Search = ({ onChange }: SearchProps) => {
  const [search, setSearch] = React.useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    if (value.length > 1) {
      onChange(value);
    }
  };
  return (
    <FormControl
      type="text"
      placeholder="Search name..."
      value={search}
      onChange={handleChange}
    />
  );
};

export default Search;
