import { Button, Card } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import { TbCurrencyTaka } from 'react-icons/tb';

const GlobalCard = ({ doc }) => {
    return (

        <Card
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-4"
        >
            <Image
                src={doc.image}
                alt={doc.name}
                width={500}
                height={400}
                className="w-full object-cover rounded-lg"
            />

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
                    <Link href={'doc-details'}>
                        <Button className={'bg-secondary'}>View Details</Button>
                    </Link>
                </div>
            </div>
        </Card>

    );
};

export default GlobalCard;