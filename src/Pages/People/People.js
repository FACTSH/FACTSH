import React from 'react'
import Heading from '../../components/Heading/Heading'
import ProfileData from '../../Content/ProfileData'
import CategoryCarousel from '../../components/CategoryCarousel/CategoryCarousel'
import './people.css'

const categories = [
  { key: 'Faculty', title: 'Faculty' },
  { key: 'PhDScholars', title: 'PhD Scholars' },
  { key: 'International_Collaborators', title: 'International Collaborators' },
  { key: 'Industry_Experts', title: 'Industry Experts' },
  { key: 'MTech', title: 'M.Tech Students' },
  { key: 'UG', title: 'UG Students' },
  { key: 'Interns', title: 'Interns' },
  { key: 'Alumni', title: 'Alumni' },
];

function People() {
  return (
    <div className='container people-page'>
      <Heading eyebrow="The lab" content="People" />
      <div className="category-list">
        {categories.map((c) => {
          const data = ProfileData[c.key] || [];
          if (data.length === 0) return null;
          return <CategoryCarousel key={c.key} title={c.title} people={data} />;
        })}
      </div>
    </div>
  )
}

export default People
