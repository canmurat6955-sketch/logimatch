import ShipmentDetails from "@/components/dashboard/shipment/ShipmentDetails";

export default function ShipmentDetailsPage({ params }: { params: { id: string } }) {
    return (
        <ShipmentDetails id={params.id} />
    );
}
