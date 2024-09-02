import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const AreYouReadySection = () => {
  const router = useRouter();
  return (
    <section className="w-full bg-primary py-12 text-white md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Gata să-ți Găsești Mentorul?
            </h2>
            <p className="max-w-[900px] text-blue-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Alătură-te Mentor-Lab astăzi și fă primul pas către succesul
              academic. Platforma noastră bazată pe AI te va potrivi cu mentorul
              perfect pentru a te ghida în călătoria ta de licență.
            </p>
          </div>
          <Button
            variant="outline"
            className="text-primary"
            size="lg"
            onClick={() => router.push("/auth/register")}
          >
            Începe Acum
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AreYouReadySection;
