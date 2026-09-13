import Categories from './components/Categories'
import Faq from '@/src/shared/components/faq/Faq'
import Recomendations from '../blog/components/Recomendations'
import PopularProducts from './components/PopularProducts'
import ProductsDisplay from './components/ProductsDisplay'

const HomePage = () => {
    return (
        <div className='flex flex-col items-start justify-center gap-sm w-full bg-surface-container-lowest'>
            <Categories categories={[{ name: 'Category 1', image: '/images/cat1.jpg', link: '/products/category-1' }, { name: 'Category 2', image: '/images/cat1.jpg', link: '/products/category-2' }, { name: 'Category 3', image: '/images/cat1.jpg', link: '/products/category-3' }, { name: 'Category 4', image: '/images/cat1.jpg', link: '/products/category-4' }, { name: 'Category 5', image: '/images/cat1.jpg', link: '/products/category-5' }, { name: 'Category 5', image: '/images/cat1.jpg', link: '/products/category-5' }]} images={['/images/cat1.jpg', '/images/cat2.jpg', '/images/cat3.jpg', '/images/cat4.jpg', '/images/cat5.jpg']} />
            <ProductsDisplay title='جدیدترین محصولات' />
            <PopularProducts brands={[{ name: 'Brand 1', image: '/images/pop.jpg', link: '/products/brand-1' }, { name: 'Brand 2', image: '/images/pop.jpg', link: '/products/brand-2' }, { name: 'Brand 3', image: '/images/pop.jpg', link: '/products/brand-3' }, { name: 'Brand 4', image: '/images/pop.jpg', link: '/products/brand-4' }, { name: 'Brand 5', image: '/images/pop.jpg', link: '/products/brand-5' }, { name: 'Brand 6', image: '/images/pop.jpg', link: '/products/brand-6' }]} />
            <ProductsDisplay title='پرفروش‌ترین‌ها' />
            <Recomendations />
            <Faq />
        </div>
    )
}

export default HomePage