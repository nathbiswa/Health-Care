import { Button, Card } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import { TbCurrencyTaka } from 'react-icons/tb';

const GlobalCard = ({ doc }) => {
    console.log("From doctor details", doc)
    return (

        <Card
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-4"
        >
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
                <Image
                    src={doc.image}
                    alt={doc.name}
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>

            <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-800">
                    {doc.name}
                </h3>

                <p className="text-sm text-gray-500">{doc.specialty}</p>

                <p className="text-yellow-500 mt-2 font-medium">
                    ⭐ {doc.rating}
                </p>

                <div className=" flex justify-between text-sm mt-2 text-gray-600">
                    <div className='flex items-center'> <span className='text-md font-bold'>Fee:</span>  <div className='flex items-center'><TbCurrencyTaka />{doc.fee}</div></div>
                    <Link href={`/appointments/${doc._id}`} >
                        <Button className={'bg-secondary'}>View Details</Button>
                    </Link>
                </div>
            </div>
        </Card>

    );
};

export default GlobalCard;