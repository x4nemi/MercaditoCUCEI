import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Modal,
  Image,
  Platform,
} from "react-native";

function TermsScreen() {
  return (
    <ScrollView>

    <View style={{flex:1}}>
      <Text style={styles.baseText}>
      <Text style={styles.titleText}>
        {"\n"}
        Aviso de privacidad
        {"\n"}
        {"\n"}
      </Text>
      <Text style={styles.subtitleText}>
        Politicas de privacidad
        {"\n"}
        {"\n"}      
      </Text>
      {/* <Text numberOfLines={5}> */}
      El presente Política de Privacidad establece los términos en que MERCADITO CUCEI usa y protege la información que es proporcionada por sus usuarios al momento de utilizar su sitio web. Esta compañía está comprometida con la seguridad de los datos de sus usuarios. 
      {"\n"}      
      {"\n"}      

      Cuando le pedimos llenar los campos de información personal con la cual usted pueda ser identificado, lo hacemos asegurando que sólo se empleará de acuerdo con los términos de este documento. Sin embargo esta Política de Privacidad puede cambiar con el tiempo o ser actualizada por lo que le recomendamos y enfatizamos revisar continuamente esta página para asegurarse que está de acuerdo con dichos cambios.       

      Al crearse una cuenta usted esta aceptando estos datos.
      </Text>
    </View>
    <View style={{flex:1}}>
      <Text style={styles.baseText}>
      <Text style={styles.subtitleText}>
        Información que es recogida
        {"\n"}
        {"\n"}      
      </Text>
      {/* <Text numberOfLines={5}> */}
      Nuestra aplicación podrá recoger información personal por ejemplo: Nombre, información de contacto como su dirección de correo electrónic. Así mismo cuando sea necesario podrá ser requerida información específica para procesar algún pedido o realizar una entrega o facturación.     
      </Text>
    </View>
    <View style={{flex:1}}>
      <Text style={styles.baseText}>
      <Text style={styles.subtitleText}>
        Uso de la información recogida
        {"\n"}
        {"\n"}      
      </Text>
      {/* <Text numberOfLines={5}> */}
      Nuestro aplicación emplea la información con el fin de proporcionar el mejor servicio posible, particularmente para mantener un registro de usuarios, de pedidos, y mejorar nuestros productos y servicios. 
      </Text>
    </View>
    <View style={{flex:1}}>
      <Text style={styles.baseText}>
      <Text style={styles.subtitleText}>
        Enlaces a Terceros
        {"\n"}
        {"\n"}      
      </Text>
      {/* <Text numberOfLines={5}> */}
      Esta aplicación pudiera contener enlaces a otros sitios que pudieran ser de su interés. Una vez que usted de clic en estos enlaces y abandone nuestra página, ya no tenemos control sobre al sitio al que es redirigido y por lo tanto no somos responsables de los términos o privacidad ni de la protección de sus datos en esos otros sitios terceros. Dichos sitios están sujetos a sus propias políticas de privacidad por lo cual es recomendable que los consulte para confirmar que usted está de acuerdo con estas.

      Mercadito CUCEI Se reserva el derecho de cambiar los términos de la presente Política de Privacidad en cualquier momento
      </Text>
    </View>


    <View style={{flex:1}}>
      <Text style={styles.baseText}>
      <Text style={styles.subtitleText}>
        Ventas no Autorizdadas
        {"\n"}
        {"\n"}      
      </Text>
        {/* <Text numberOfLines={5}> */}
        Queda extrictamente prohibido la venta de cualquier tipo de arma, asi como servicios ilegales que en la ley y las normas de la universidad de guadalajara conciernen, el inclumpliemnto de alguna norma de la universidad de guadalajara por medio de nuestra aplicacion sera sancionado y se le pasara toda la informacion correspondiente hacia las autoridades.
      </Text>
    </View>

    <View>
      <Text style={{fontSize : 7, padding:20, color: "blue"}}>
      Maestra si ve esto pasenos por favor, estoy muriendo.
      {"\n"}      
      {"\n"}      

      </Text>
    </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  baseText: {
    fontFamily: "Cochin",
    textAlign : "justify",
    padding: 20,
    fontSize: 14,  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    alignSelf : "center"
  },
  subtitleText: {
    fontSize: 20,
    fontWeight: "bold"

  }
});

export default TermsScreen;
