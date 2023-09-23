import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Button> Login </Button>
      <div className="flex flex-col">
        <div className="flex-grow bg-red-500">
          <div>Elemen 1</div>
          <div>Elemen 2</div>
        </div>
        <div className="flex-shrink bg-blue-600">
          <div>Elemen 3</div>
          <div>Elemen 4</div>
        </div>
      </div>
    </div>
  );
}
