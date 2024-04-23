import CategoryTile from '../components/CategoryTile';

export default function HomePage() {
  const categories = ['Economics', 'Detective', 'Science', 'Politics', 'History', 'Science-Fiction', 'Entertainment', 'Romance', 'Tragedy' ]



  return (
    <div>
      {categories.map((categoryName, index)=>{
        return (
          <div key={index}>
          <CategoryTile categoryName={categoryName} />
      </div>
      )
        
      })}


    </div>
  )
}
