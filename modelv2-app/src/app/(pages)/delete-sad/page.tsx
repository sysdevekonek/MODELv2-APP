import DeleteSADPage from "@/components/features/deleteSAD";

export default function DeleteSAD() {
  return (
    <div className="bg-bgContainer w-full">
      <div className="bg-main1 text-titlebodytext1 font-semibold p-4 inline-block rounded-[5px] mb-4 -translate-y-1/4 -top-6 shadow-lg">
        <h1>DELETE SAD</h1>
      </div>
      <div className="p-4">
        <DeleteSADPage />
      </div>
    </div>
   
  );
}
