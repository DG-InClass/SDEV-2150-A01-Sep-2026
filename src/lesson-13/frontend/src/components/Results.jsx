import ResultsItem from './ResultsItem';
import { resources } from '../data/resources';
import Card from './ui/Card';

export default function Results({selectedResource, setSelectedResource, searchTerm, selectedCategories, openNowOnly}) {
  // TODO: create filtered resources to render
  // Currently, we're importing all the data for the resource
  const query = searchTerm.trim().toLowerCase();
  const checkMatch = (resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(query);
    const matchesCategory = selectedCategories.length === 0 // "All"
      || selectedCategories.includes(resource.category);
    // If openNowOnly is false, then it's an automatic match
    // or it's a match if the resource.openNow is true
    const matchesOpenNow = !openNowOnly || resource.openNow;
    return matchesSearch && matchesCategory && matchesOpenNow;
  };

  const filteredResources = resources.filter(checkMatch);

  return (
    <Card title="Results">
      <ul className="divide-y divide-gray-200">
        {filteredResources.map((r) => (
          <ResultsItem
            key={r.id}
            title={r.title}
            category={r.category}
            summary={r.summary}
            location={r.location}
            onClick={() => setSelectedResource(r)}
            selected={selectedResource?.id === r.id}
          >
            {/* children: optional badge content */}
            {r.openNow && (
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                Open now
              </span>
            )}
          </ResultsItem>
        ))}
      </ul>
    </Card >
  );
}