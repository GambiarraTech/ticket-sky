import React from 'react'
import Link from 'next/link'
import { Navbar} from '@/components/promoter/navbar/navbar'
import { Carousel } from '@/components/promoter/carousel/carousel'

export default function Home() {
    return(
        <div>
            <Navbar />
            <Carousel />
        </div>



    )
}
