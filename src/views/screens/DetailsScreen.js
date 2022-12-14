import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, CheckIcon, FormControl, Input, Modal, Select, WarningOutlineIcon } from 'native-base';
import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
  Pressable,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
const { width } = Dimensions.get('screen');
const DetailsScreen = ({ navigation, route }) => {
  const house = route.params;

  const [modalVisible, setModalVisible] = React.useState(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);



  const saveBookedHostel = async () => {
    try {
      await AsyncStorage.setItem('@bookedHostel', JSON.stringify(house));
      alert('Hostel Booked successfully')
      setModalVisible(false)
    } catch (error) {
      alert(error.message);
    }
  }




  const InteriorCard = ({ interior }) => {
    return <Image source={interior} style={style.interiorImage} />;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* House image */}

        <View style={style.backgroundImageContainer}>
          <ImageBackground style={style.backgroundImage} source={house.image}>
            <View style={style.header}>
              <View style={style.headerBtn}>
                <Icon
                  name="arrow-back-ios"
                  size={20}
                  onPress={navigation.goBack}
                />
              </View>
              <View style={style.headerBtn}>
                <Icon name="favorite" size={20} color={COLORS.red} />
              </View>
            </View>
          </ImageBackground>

          {/* Virtual Tag View */}
          {/* <View style={style.virtualTag}>
            <Text style={{ color: COLORS.white }}>Virtual tour</Text>
          </View> */}
        </View>

        <View style={style.detailsContainer}>
          {/* Name and rating view container */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              {house.title}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={style.ratingTag}>
                <Text style={{ color: COLORS.white }}>4.8</Text>
              </View>
              {/* <Text style={{ fontSize: 13, marginLeft: 5 }}>155 ratings</Text> */}
            </View>
          </View>

          {/* Location text */}
          <Text style={{ fontSize: 16, color: COLORS.grey }}>
            {house.location}
          </Text>

          {/* Facilities container */}
          {/* <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <View style={style.facility}>
              <Icon name="hotel" size={18} />
              <Text style={style.facilityText}>2</Text>
            </View>
            <View style={style.facility}>
              <Icon name="bathtub" size={18} />
              <Text style={style.facilityText}>2</Text>
            </View>
            <View style={style.facility}>
              <Icon name="aspect-ratio" size={18} />
              <Text style={style.facilityText}>100m area</Text>
            </View>
          </View> */}
          <Text style={{ marginTop: 20, color: COLORS.grey }}>
            {house.details}
          </Text>

          {/* Interior list */}
          {/* <FlatList
            contentContainerStyle={{ marginTop: 20 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, key) => key.toString()}
            data={house.interiors}
            renderItem={({ item }) => <InteriorCard interior={item} />}
          /> */}

          {/* footer container */}
          <View style={style.footer}>
            <View>
              <Text
                style={{ color: COLORS.blue, fontWeight: 'bold', fontSize: 18 }}>
                {house?.price}GHS
              </Text>
              <Text
                style={{ fontSize: 12, color: COLORS.grey, fontWeight: 'bold' }}>
                Total Price
              </Text>
            </View>
            <View style={style.bookNowBtn}>
              <Pressable onPress={() => {
                setModalVisible(!modalVisible)
              }}>
                <Text style={{ color: COLORS.white }}>Book Now</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Room Selection</Modal.Header>
          <Modal.Body>
            <FormControl maxW="300" isRequired isInvalid>
              <FormControl.Label>Room Type</FormControl.Label>
              <Select ref={initialRef} minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size={5} />
              }} mt="1">
                <Select.Item label="Single Room" value="ux" />
                <Select.Item label="Two in a room" value="web" />
                <Select.Item label="4 in a room" value="cross" />
                <Select.Item label="UI Designing" value="ui" />
              </Select>
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Preferred Contact Number</FormControl.Label>
              <Input />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                setModalVisible(false);
              }}>
                Cancel
              </Button>
              <Button backgroundColor={COLORS.dark} onPress={saveBookedHostel}>
                Continue
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  backgroundImageContainer: {
    elevation: 20,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
    height: 350,
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  headerBtn: {
    height: 50,
    width: 50,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingTag: {
    height: 30,
    width: 35,
    backgroundColor: COLORS.blue,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  virtualTag: {
    top: -20,
    width: 120,
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 20,
    backgroundColor: COLORS.dark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  interiorImage: {
    width: width / 3 - 20,
    height: 80,
    marginRight: 10,
    borderRadius: 10,
  },
  footer: {
    height: 70,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  bookNowBtn: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.dark,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  detailsContainer: { flex: 1, paddingHorizontal: 20, marginTop: 40 },
  facility: { flexDirection: 'row', marginRight: 15 },
  facilityText: { marginLeft: 5, color: COLORS.grey },
});

export default DetailsScreen;
