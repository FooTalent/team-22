import { useAppStore } from "../store/useAppStore";
import SearchIcon from "@mui/icons-material/Search";

const Home = () => {

  const { status, userDetail } = useAppStore()

  if (status)
    return (
      <div className="flex flex-col gap-12 text-card">
        <div className="flex justify-between items-center">
          <h1 className="text-home leading-9 font-semibold">¡Bienvenido Profesor!</h1>

          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="¿Qué estas buscando?"
                className="border border-Grey rounded-lg px-4 py-3 pl-11 w-[566px] h-[48px] bg-inputBg text-card placeholder:text-Grey outline-none focus:border-Purple hover:border-Purple"
              />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#444444]" />
            </div>

            <button className="bg-Purple tracking-wide hover:bg-PurpleHover text-white font-extrabold px-4 py-3 rounded-lg h-[48px] ease-out duration-600">
              Buscar
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex flex-col gap-4 justify-between flex-1">
            <div className="shadow-home rounded-xl py-6 px-8 flex items-center gap-6">
              <div className="flex flex-col justify-between gap-4 flex-1">
                <h2 className="text-xl leading-6 font-semibold">¿Estás listo/a para empezar a dar clases?</h2>
                <p className="leading-custom">
                  Ingresa a ver más para acceder al instructivo de cómo crear tus programas, clases, y cómo agregar materiales. Encontrá recursos útiles, un recorrido completo por la página y descubre cómo gestionar a tus alumnos.
                </p>
                <button className="bg-card hover:bg-Yellow text-Yellow tracking-wide hover:text-card font-extrabold px-4 py-2 rounded-lg self-start ease-out duration-6000">
                  Ver más
                </button>
              </div>

              <img
                src="/ImagesHome/Comencemos.png"
                alt="PopupComencemos"
                className="max-w-48 h-auto m-auto"
              />
            </div>

            <div className="grid grid-cols-3 gap-10 m-0">
              <div className="shadow-home rounded-xl py-6 px-8 flex flex-col gap-4">
                <img
                  src="/ImagesHome/TotalPrograma.png"
                  alt="Total Programa"
                  className="w-[75px] h-auto rounded-lg"
                />
                <p className="text-xl font-semibold leading-6">15</p>
                <p className="leading-custom">Total de programas</p>
              </div>

              <div className="shadow-home rounded-xl py-6 px-8 flex flex-col gap-4">
                <img
                  src="/ImagesHome/ProgramaCompleto.png"
                  alt="Programa Completo"
                  className="w-[75px] h-auto rounded-lg"
                />
                <p className="text-xl font-semibold leading-6">6</p>
                <p className="leading-custom">Programas completos</p>
              </div>

              <div className="shadow-home rounded-xl py-6 px-8 flex flex-col gap-4">
                <img
                  src="/ImagesHome/CargaHoraria.png"
                  alt="Carga Horaria"
                  className="w-[75px] h-auto rounded-lg"
                />
                <p className="text-xl font-semibold leading-6">120 hrs</p>
                <p className="leading-custom">Total carga horaria</p>
              </div>
            </div>

            <div className="flex flex-col justify-between lg:grid lg:grid-cols-2 gap-14">
              <div className="flex flex-col gap-6">
                <h3 className="text-2xl leading-7 font-semibold">Tu clase ahora</h3>

                <div className="shadow-home rounded-lg max-w-[357px] h-[145px] p-4 cursor-pointer">
                  <div className="flex flex-col justify-between h-full">
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <h3 className="text-2xl leading-7 font-semibold">Tu próxima clase</h3>

                <div className="shadow-home rounded-lg max-w-[357px] h-[145px] p-4 cursor-pointer">
                  <div className="flex flex-col justify-between h-full">
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-8 lg:max-w-[390px]">
            <div className="shadow-home rounded-xl py-6 px-8 flex flex-col gap-6 max-w-[390px]">
              <img
                src="/ImagesHome/creacionvideo.PNG"
                alt="Creación Video"
                className="object-cover rounded-lg max-h-[185px]"
              />
              <div className="flex flex-col gap-4">
                <h2 className="text-xl leading-6 font-semibold">Cómo crear tus clases</h2>
                <p className="leading-custom">Dale play al video para ver</p>
              </div>
            </div>

            <div className="shadow-home rounded-xl py-6 px-8 flex flex-col gap-6 max-w-[390px]">
              <h2 className="text-xl leading-6 font-semibold">Últimas Novedades</h2>
              <p className="leading-custom">
                Mantente al día con las últimas actualizaciones y eventos. Descubre nuevos recursos disponibles para mejorar tus clases, tips para un mejor manejo de tus aulas virtuales, y noticias relevantes del mundo de la educación.
              </p>
              <img
                src="/ImagesHome/novedades.PNG"
                alt="Últimas Novedades"
                className="object-cover rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    );
};

export default Home;







