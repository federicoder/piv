/*
    Video: https://www.youtube.com/watch?v=oCMOYS71NIU
    Based on Neil Kolban example for IDF: https://github.com/nkolban/esp32-snippets/blob/master/cpp_utils/tests/BLE%20Tests/SampleNotify.cpp
    Ported to Arduino ESP32 by Evandro Copercini
    updated by chegewara

   Create a BLE server that, once we receive a connection, will send periodic notifications.
   The service advertises itself as: 4fafc201-1fb5-459e-8fcc-c5c9c331914b
   And has a characteristic of: beb5483e-36e1-4688-b7f5-ea07361b26a8

   The design of creating the BLE server is:
   1. Create a BLE Server
   2. Create a BLE Service
   3. Create a BLE Characteristic on the Service
   4. Create a BLE Descriptor on the characteristic
   5. Start the service.
   6. Start advertising.

   A connect hander associated with the server starts a background task that performs notification
   every couple of seconds.
*/
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>
#include <MQ2.h>
#include "Hardwareserial.h"

HardwareSerial RxSerial(1);
int lpg, co, smoke;

int Gas_analogMQ2 = 15;   
int Gas_analogMQ135 = 33;
int RF_analog = 32;

MQ2 mq2(Gas_analogMQ2);
BLEServer* pServer = NULL;
BLECharacteristic* pCharacteristic = NULL;
BLECharacteristic* pCharacteristic2 = NULL;
BLECharacteristic* pCharacteristic3 = NULL;
BLECharacteristic* pCharacteristic4 = NULL;
BLECharacteristic* pCharacteristic5 = NULL;
bool deviceConnected = false;
bool oldDeviceConnected = false;
uint32_t value = 0;

// See the following for generating UUIDs:
// https://www.uuidgenerator.net/

#define SERVICE_UUID        "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
#define CHARACTERISTIC_UUID "beb5483e-36e1-4688-b7f5-ea07361b26a8"
#define SERVICE_UUID2        "4fafc202-1fb5-459e-8fcc-c5c9c331914b"
#define CHARACTERISTIC_UUID2 "beb5483d-36e1-4688-b7f5-ea07361b26a8"
#define SERVICE_UUID3        "4fafc203-1fb5-459e-8fcc-c5c9c331914b"
#define CHARACTERISTIC_UUID3 "beb5483c-36e1-4688-b7f5-ea07361b26a8"
#define SERVICE_UUID4        "4fafc204-1fb5-459e-8fcc-c5c9c331914b"
#define CHARACTERISTIC_UUID4 "beb5483b-36e1-4688-b7f5-ea07361b26a8"
#define SERVICE_UUID5        "4fafc205-1fb5-459e-8fcc-c5c9c331914b"
#define CHARACTERISTIC_UUID5 "beb5483a-36e1-4688-b7f5-ea07361b26a8"

class MyServerCallbacks: public BLEServerCallbacks {
    void onConnect(BLEServer* pServer) {
      deviceConnected = true;
    };

    void onDisconnect(BLEServer* pServer) {
      deviceConnected = false;
    }
};



void setup() {
  
  Serial.begin(115200);
  mq2.begin();
  // Create the BLE Device
  BLEDevice::init("ESP32");
  RxSerial.begin(2400,SERIAL_8N1,19,17);
  // Create the BLE Server
  pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());

  // Create the BLE Service
  BLEService *pService = pServer->createService(SERVICE_UUID);
  BLEService *pService2 = pServer->createService(SERVICE_UUID2);
  BLEService *pService3 = pServer->createService(SERVICE_UUID3);
  BLEService *pService4 = pServer->createService(SERVICE_UUID4);
  BLEService *pService5 = pServer->createService(SERVICE_UUID5);

  // Create a BLE Characteristic
  pCharacteristic = pService->createCharacteristic(
                      CHARACTERISTIC_UUID,
                      BLECharacteristic::PROPERTY_READ   |
                      BLECharacteristic::PROPERTY_WRITE  |
                      BLECharacteristic::PROPERTY_NOTIFY |
                      BLECharacteristic::PROPERTY_INDICATE
                    );
    // Create a BLE Characteristic
  pCharacteristic2 = pService2->createCharacteristic(
                      CHARACTERISTIC_UUID2,
                      BLECharacteristic::PROPERTY_READ   |
                      BLECharacteristic::PROPERTY_WRITE  |
                      BLECharacteristic::PROPERTY_NOTIFY |
                      BLECharacteristic::PROPERTY_INDICATE
                    );
  pCharacteristic3 = pService3->createCharacteristic(
                      CHARACTERISTIC_UUID3,
                      BLECharacteristic::PROPERTY_READ   |
                      BLECharacteristic::PROPERTY_WRITE  |
                      BLECharacteristic::PROPERTY_NOTIFY |
                      BLECharacteristic::PROPERTY_INDICATE
                    );
  pCharacteristic4 = pService4->createCharacteristic(
                      CHARACTERISTIC_UUID4,
                      BLECharacteristic::PROPERTY_READ   |
                      BLECharacteristic::PROPERTY_WRITE  |
                      BLECharacteristic::PROPERTY_NOTIFY |
                      BLECharacteristic::PROPERTY_INDICATE
                    );
  pCharacteristic5 = pService5->createCharacteristic(
                      CHARACTERISTIC_UUID5,
                      BLECharacteristic::PROPERTY_READ   |
                      BLECharacteristic::PROPERTY_WRITE  |
                      BLECharacteristic::PROPERTY_NOTIFY |
                      BLECharacteristic::PROPERTY_INDICATE
                    );
  // https://www.bluetooth.com/specifications/gatt/viewer?attributeXmlFile=org.bluetooth.descriptor.gatt.client_characteristic_configuration.xml
  // Create a BLE Descriptor
  pCharacteristic->addDescriptor(new BLE2902());
  pCharacteristic2->addDescriptor(new BLE2902());
  pCharacteristic3->addDescriptor(new BLE2902());
  pCharacteristic4->addDescriptor(new BLE2902());
  pCharacteristic5->addDescriptor(new BLE2902());

  // Start the service
  pService->start();
  pService2->start();
  pService3->start();
  pService4->start();
  pService5->start();
  // Start advertising
  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pAdvertising->addServiceUUID(SERVICE_UUID2);
  pAdvertising->addServiceUUID(SERVICE_UUID3);
  pAdvertising->addServiceUUID(SERVICE_UUID4);
  pAdvertising->addServiceUUID(SERVICE_UUID5);
  pAdvertising->setScanResponse(false);
  pAdvertising->setMinPreferred(0x0);  // set value to 0x00 to not advertise this parameter
  BLEDevice::startAdvertising();
  Serial.println("Waiting a client connection to notify...");

}

void loop() {

    //RF sensor:
    String received = "";
    int receivedInt = 255;

    delay(2000);
    // notify changed value
    if (deviceConnected) {
        uint8_t gassensorAnalogMQ2 = analogRead(Gas_analogMQ2);
        uint8_t gassensorAnalogMQ135 = analogRead(Gas_analogMQ135);
        int lett1 = analogRead(Gas_analogMQ2);
        int lett2 = analogRead(Gas_analogMQ135);
        lpg = mq2.readLPG();
        co = mq2.readCO();
        smoke = mq2.readSmoke();
    
        Serial.print("lpg : ");
        Serial.println(lpg);
        Serial.print("co : ");
        Serial.println(co);
        Serial.print("smoke : ");
        Serial.println(smoke);
        
        Serial.print("MQ2 :");
        Serial.println(analogRead(Gas_analogMQ2));
        Serial.print("MQ135 : ");
        Serial.println(analogRead(Gas_analogMQ135));
        received = char(RxSerial.read());
        receivedInt = RxSerial.read();
        Serial.print("receivedInt : ");
        Serial.println(receivedInt);
        Serial.print("received : ");
        Serial.println(received);
        int rf = analogRead(RF_analog);
        Serial.print("RF: ");
        Serial.println(rf);

        value = lett1;
        value = (value<<16)|lett2;
  //      pCharacteristic->setValue((uint8_t*)&value, 4);
  //      value = (value<<8)|lett2;
 //       pCharacteristic->setValue((uint8_t*)&value, 2);
        pCharacteristic->setValue(lpg);
        pCharacteristic->notify();
        pCharacteristic2->setValue(lett2);
        pCharacteristic2->notify();
        pCharacteristic3->setValue(rf);
        pCharacteristic3->notify();
        pCharacteristic4->setValue(co);
        pCharacteristic4->notify();
        pCharacteristic5->setValue(smoke);
        pCharacteristic5->notify();
        value++;
        delay(3); // bluetooth stack will go into congestion, if too many packets are sent, in 6 hours test i was able to go as low as 3ms
        delay(2000);
    }
    // disconnecting
    if (!deviceConnected && oldDeviceConnected) {
        delay(500); // give the bluetooth stack the chance to get things ready
        pServer->startAdvertising(); // restart advertising
        Serial.println("start advertising");
        oldDeviceConnected = deviceConnected;
    }
    // connecting
    if (deviceConnected && !oldDeviceConnected) {
        // do stuff here on connecting
        oldDeviceConnected = deviceConnected;
    }
}
