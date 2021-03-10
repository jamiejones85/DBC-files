function setup() {
  host.setTickInterval(50)
  host.addParameter('hv_battery_voltage')
  host.addParameter('ac_voltage')
  host.addParameter('dc_charge_current')
  host.addParameter('charger_temp_1')
  host.addParameter('charger_temp_2')
  host.addParameter('charging')
  host.addParameter('pilot_present')

}

function sendChargerStatus() {

   dataBytes = [0, 0,0,0x3D,0x3C,0,0,0]

   //hv voltage
   dataBytes[0] = hv_battery_voltage / 2;

   // ac_voltage
   dataBytes[1] = ac_voltage
   //dc_current
   dataBytes[2] = dc_charge_current * 10;

  //temperature
  dataBytes[3] = parseInt(charger_temp_1) + 40;
  dataBytes[4] = parseInt(charger_temp_2) + 40;

   //ac prsent
  if (ac_voltage && ac_voltage != '0') {
    dataBytes[5] = dataBytes[5] | 0x2
  }

  //charging
  if (charging && charging != '0') {
    dataBytes[5] = dataBytes[5] | 0x8
  }
  if (pilot_present && pilot_present != '0') {
    dataBytes[5] = dataBytes[5] | 0x80
  }
  can.sendFrame(0, 0x389, 8, dataBytes)
}

function tick() {
  sendChargerStatus();
}
