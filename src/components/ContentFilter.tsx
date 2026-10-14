import { useContext, useEffect } from 'react';
import { ContentContext } from '../contexts/ContentContext';
import { LoadingContext } from '@/contexts/LoadingContext';

const ContentFilter = () => {
  const { categories, getCategories, categorySelected, setCategory, search, setSearchTerm } =
    useContext(ContentContext);
  const { loading } = useContext(LoadingContext);

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
      <div className="flex flex-col md:flex-row gap-5">
        <input
          type="text"
          id="titleInput"
          aria-placeholder="Busque pelo título"
          placeholder="Busque pelo título"
          value={search}
          disabled={loading}
          onChange={(evt) => {
            if (!search.length && !evt.target.value.trim().length) return;
            setSearchTerm(evt.target.value);
          }}
          className="border p-1 text-[16px] focus:border-gray-400 rounded-md md:w-80"
        />

        <select
          name="categories"
          id="categoriesList"
          className="border w-full p-1 md:w-60"
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
          disabled={(!categorySelected && !search) || loading}
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
