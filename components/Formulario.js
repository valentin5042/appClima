import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, Animated, Alert } from 'react-native'
import { Picker } from '@react-native-picker/picker'


const Formulario = ({ busqueda, setBusqueda, setConsultar }) => {

    const { pais, ciudad } = busqueda

    const [ animacionBoton ] = useState(new Animated.Value(1));

    const consultarClima = () => {
        if (pais.trim() === '' || ciudad.trim() === '') {
            mostrarAlerta()
            return
        }

        //consultar la API

        setConsultar(true)
        
    }

    const mostrarAlerta = () => {
        Alert.alert(
            'Error',
            'Agrega una ciudad y país para la búsqueda',
            [
                {text: 'Entendido'}
            ]
        )
    }

    const animacionEntrada = () => {
        Animated.spring(animacionBoton, {
            toValue: .75,
            useNativeDriver: false
        }).start();
    }
    const animacionSalida = () => {
        Animated.spring(animacionBoton, {
            toValue: 1,
            useNativeDriver: false,
            friction: 1,
            tension: 20
        }).start();
    }

    const estiloAnimacion = {
        transform: [{ scale: animacionBoton }]
    }

  return (
    <>
        <View style={styles.Formulario}>

            <View>
                <TextInput 
                    value={ciudad}
                    style={styles.input}
                    onChangeText={ ciudad => setBusqueda({ ...busqueda, ciudad })}
                    placeholder='ciudad'
                    placeholderTextColor="#666"
                />
            </View>
            <View>
                <Picker 
                    selectedValue={pais}
                    itemStyle={{height: 120, backgroundColor: '#fff', borderRadius: 10}}
                    onValueChange={ pais => setBusqueda({ ...busqueda, pais }) }
                >
                    <Picker.Item label='-- Seleccione un país --' value="" />
                    <Picker.Item label='Estados Unidos' value="US" />
                    <Picker.Item label='México' value="MX" />
                    <Picker.Item label='Argentina' value="AR" />
                    <Picker.Item label='Colombia' value="CO" />
                    <Picker.Item label='Costa Rica' value="CR" />
                    <Picker.Item label='España' value="ES" />
                    <Picker.Item label='Perú' value="PE" />
                </Picker>
            </View>

            <TouchableWithoutFeedback
                onPressIn={() => animacionEntrada()}
                onPressOut={() => animacionSalida()}
                onPress={ () => consultarClima() }
            >
                <Animated.View style={[styles.btnBuscar, estiloAnimacion]}>
                    <Text style={styles.textoBuscar}>Buscar Clima</Text>
                </Animated.View>
            </TouchableWithoutFeedback>

        </View>
    </>
  )
}

const styles = StyleSheet.create({
    input: {
        padding: 10,
        height: 50,
        backgroundColor: '#fff',
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
        borderRadius: 10
    },
    btnBuscar: {
        marginTop: 50,
        backgroundColor: '#000',
        padding: 10,
        justifyContent: 'center',
        borderRadius: 10
    },
    textoBuscar: {
        color: '#fff',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: 18,
    }
})

export default Formulario