import { useContext, useEffect } from 'react';
import { ContentContext } from '../contexts/ContentContext';

const ContentFilter = () => {
  const {
    categories,
    getCategories,
    categorySelected,
    setCategory,
    search,
    setSearchTerm,
    loading,
  } = useContext(ContentContext);

  useEffect(() => {
    getCategories();
  }, []);

  const clearFilters = () => {
    setCategory('');
    setSearchTerm('');
  };

  return (
    <div className="flex flex-col gap-2 pt-2.5">
      <h3 className="text-lg font-bold">Filtros</h3>
      <div className="flex gap-5">
        <input
          type="text"
          id="titleInput"
          aria-placeholder="Busque pelo título"
          placeholder="Busque pelo título"
          value={search}
          disabled={loading}
          onChange={(evt) => setSearchTerm(evt.target.value)}
          className="border  p-1 text-[16px] focus:border-gray-400 rounded-md w-80"
        />

        <select
          name="categories"
          id="categoriesList"
          className="border w-60"
          onChange={(evt) => {
            setCategory(evt.target.value || '');
          }}
          disabled={loading}
        >
          <option value="">Selecione</option>
          {categories.map(({ name, slug }) => {
            return (
              <option key={slug} value={slug} selected={slug === categorySelected}>
                {name}
              </option>
            );
          })}
        </select>
        <button
          disabled={!categorySelected && !search && !loading}
          className="border py-1 px-2 bg-indigo-400 text-white border-gray-400 disabled:bg-gray-300 disabled:text-gray-500"
          onClick={clearFilters}
        >
          Limpar Filtros
        </button>
      </div>
    </div>
  );
};

export default ContentFilter;
