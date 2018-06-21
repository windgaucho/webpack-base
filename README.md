# code-base

<dl>
  <dt>Repositorio con configuración de webpack y codigo base para proyectos react.js</dt>
</dl>

## webpack
<dl>
  <dt>Se utiliza el aprouch de configuración por composición.</dt>

  webpack.config.js ==> configuración de alto nivel.
  webpack.parts.js ===> configuración de partes.

  <dt>Configuración</dt>
  html-webpack-plugin           ==> Genera un archivo index.html en forma automática.
  Este plugin injecta en forma automática el bundle.js y los archivos css generados.
  webpack-dashboard/plugin      ==> Dashboard para webpack dev server.
  error-overlay-webpack-plugin  ==> Muestra errores en browser con estilo.
  webpack-merge                 ==> Combina varios objetos o arrays, en este caso archivos de configuración.

  <dt>CSS</dt>
  css-loader   ==> Loaders para importar CSS
  style-loader ==> Loaders para importar CSS
  mini-css-extract-plugin       ==> Extrae CSS en archivos separados (del bundle.js).
  purifycss-webpack y purify-css ==> Extra los CSS que no se utilizan.
  Este plugin tiene que ser utilizado después de MiniCssExtractPlugin, caso contrario no funciona.

  <dt>ASSESTS</dt>
  url-loader  ==> Transforma archivos en URLs base64. (Las agrega al bundle). Este plugin usa file-loader cuando el limit es alcanzado.
  file-loader ==>

  <dt>BABEL</dt>
  babel-loader
  babel-core

  <dt>BUILDING</dt>
  sourceMap ==> se setea con el parametro devtool de webpack.
  devtool = source-map extrae a un archivo map el source.map del codigo. Producción.
  devtool = eval-source-map, obtiene la mayor cantidad de info. Desarrollo.

  clean-webpack-plugin ==> para limpiar la carpeta dist antes de cada build.
  banner-plugin
  git-revision-webpack-plugin ==> junto con banner-plugin agrega info de la versión a los bundles.

</dl>

## package.json
<dl>
  <dt>flag --env</dt>
  <dd>permite pasar un string on un objeto a la configuración.</dd>
  <br />
  <dd>
    --env development
    --env production
    En el caso de --env.target production la configuraicón recive un objeto en la forma: { target: "production" }
  </dd>
</dl>
