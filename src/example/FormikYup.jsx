import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Formik } from 'formik';
import { Input, Button, Toggle } from '@ui-kitten/components';
import * as Yup from 'yup';

const FormikYup = () => {
    const registerSchema = Yup.object().shape({
        name: Yup.string().required("Required"),
        surname: Yup.string().required("Required"),
        email: Yup.string().required("Required").email('Invalid email!'),
        phone: Yup.string().required("Required").min(11, 'Min 11').max(13, 'Max 13'),
        password: Yup.string().required("Required").matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Conditions are not met'
        ),
        passwordConfirm: Yup.string().required("Required").oneOf(
            [Yup.ref('password')],
            "Passwords do not match"
        ),
        agrement: Yup.bool().required('Required').oneOf([true], 'You need to accept the agreement.')
    });

    return (
        <View style={styles.container}>
            <View style={{
                padding: 20,
                backgroundColor: '#EE5007',
                minHeight: 125,
                justifyContent: 'flex-end',
                alignItems: 'center'
            }}>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'white'
                }}>Register</Text>
            </View>

            <View style={{ flex: 1, padding: 10 }}>
                <ScrollView>
                    <Formik
                        initialValues={{
                            email: '',
                            name: '',
                            surname: '',
                            phone: '',
                            password: '',
                            passwordConfirm: '',
                            agrement: 'false'
                        }}
                        validationSchema={registerSchema}
                        onSubmit={values => Alert.alert('Form Sended', JSON.stringify(values, null, 2))}
                    >
                        {({ handleChange, handleSubmit, values, setFieldValue, errors }) => (
                            <View>
                                <Input
                                    label={'Name'}
                                    size='large'
                                    style={{ marginVertical: 10 }}
                                    value={values.name}
                                    onChangeText={handleChange('name')}
                                    placeholder="Enter your name"
                                    status={errors.name ? "danger" : "basic"}
                                    caption={errors.name}
                                />
                                <Input
                                    label={'Surname'}
                                    size='large'
                                    style={{ marginVertical: 10 }}
                                    value={values.surname}
                                    onChangeText={handleChange('surname')}
                                    placeholder="Enter your surname"
                                    status={errors.surname ? "danger" : "basic"}
                                    caption={errors.surname}
                                />
                                <Input
                                    label={'E-mail'}
                                    size='large'
                                    style={{ marginVertical: 10 }}
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    placeholder="Enter your email"
                                    status={errors.email ? "danger" : "basic"}
                                    caption={errors.email}
                                />
                                <Input
                                    label={'Phone'}
                                    size='large'
                                    style={{ marginVertical: 10 }}
                                    value={values.phone}
                                    onChangeText={handleChange('phone')}
                                    placeholder="Enter your phone"
                                    status={errors.phone ? "danger" : "basic"}
                                    caption={errors.phone}
                                />
                                <Input
                                    label={'Password'}
                                    size='large'
                                    style={{ marginVertical: 10 }}
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                    placeholder="Enter your password"
                                    status={errors.password ? "danger" : "basic"}
                                    caption={errors.password}
                                />
                                <Input
                                    label={'Confirm Password'}
                                    size='large'
                                    style={{ marginVertical: 10 }}
                                    value={values.passwordConfirm}
                                    onChangeText={handleChange('passwordConfirm')}
                                    placeholder="Confirm your password"
                                    status={errors.passwordConfirm ? "danger" : "basic"}
                                    caption={errors.passwordConfirm}
                                />

                                <View>
                                    <Toggle
                                        checked={values.agrement}
                                        onChange={(value) => setFieldValue('agrement', value)}

                                    >
                                        I accept the user privacy policy and the confidentiality agreement.
                                    </Toggle>
                                    {errors.agrement && (
                                        <Text style={{ color: 'red' }}>{errors.agrement}</Text>
                                    )}
                                </View>


                                <Button
                                    style={{
                                        marginVertical: 10,
                                        backgroundColor: '#BF3131',
                                        borderRadius: 20,
                                        borderWidth: 0,
                                    }}
                                    onPress={handleSubmit}
                                >
                                    Submit
                                </Button>
                            </View>
                        )}
                    </Formik>
                </ScrollView>
            </View>
        </View>
    );
};

export default FormikYup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
