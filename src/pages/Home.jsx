const Home = () => {
  return (
    <div className="overflow-hidden bg-white">
      <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Nuevos productos finalmente están aquí!
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              Nuestra nueva colección para motociclistas te protegerá en la
              Carretera.
            </p>
          </div>
          <div>
            <div className="mt-10">
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className=" grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                        <img
                          src="https://res.cloudinary.com/dlxf1d5ag/image/upload/v1711092246/llo/casco-shaft-pro-610-versus-nm-mrn_h7aqep.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className=" h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://res.cloudinary.com/dlxf1d5ag/image/upload/v1711092046/llo/images_qtnrgb.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className=" mt-8 grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://res.cloudinary.com/dlxf1d5ag/image/upload/v1711091933/llo/0012_SHPRO-600DV.FLOWING.N.M.SL_.LATERAL-600x601_atrpqb.png"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://res.cloudinary.com/dlxf1d5ag/image/upload/v1711091927/llo/Alpinestars_Athem_V4_Racing_Suit_06014c9f-8615-4824-b765-548ab2845400_1200x1200_ldsnx2.webp"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://res.cloudinary.com/dlxf1d5ag/image/upload/v1711091930/llo/guantes_dirtpaw_web_pphaai.webp"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://res.cloudinary.com/dlxf1d5ag/image/upload/v1711092269/llo/H7987f5dd3d324bf49705e0604039bb51R.jpg_640x640Q90.jpg__xb4ppc.webp"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://res.cloudinary.com/dlxf1d5ag/image/upload/v1711091789/llo/D_NQ_NP_791903-MCO69841425255_062023-O_l2ofxf.webp"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="#"
                className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
              >
                Obtener
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
