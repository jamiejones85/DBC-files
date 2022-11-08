var id = 0;
const module1StartId = 0x1B0;
const module2StartId = 0x1B4;
const module3StartId = 0x1B8;
const module4StartId = 0x1BC;
const module5StartId = 0x1C0;
const module6StartId = 0x1C4;
const module7StartId = 0x1C8;
const module8StartId = 0x1CC;

function setup() {
  host.setTickInterval(50);
  host.addParameter("mockedCellVoltage")
}

function sendVoltages(frameId, voltage) {
  dataBytes = [0x2C, 0,0,0,0,0,0,0]

  if (frameId == 0x1B0) {
  dataBytes[1] = ((voltage - 980 )  & 0xF) << 4
  dataBytes[2] = (voltage - 980 ) >> 4 & 0xFF
  } else {
  //cell 1
  dataBytes[1] = ((voltage - 1000 )  & 0xF) << 4
  dataBytes[2] = (voltage - 1000 ) >> 4 & 0xFF
  }
  //cell2
  dataBytes[3] = (voltage - 1000 )  & 0xFF
  dataBytes[4] = (voltage - 1000 ) >> 8 & 0xF

  //cell 3
  dataBytes[4] =  (((voltage - 1000 )  & 0xF) << 4) + dataBytes[4]
  dataBytes[5] = (voltage - 1000 >> 4 ) & 0xFF

  //cell 4
  dataBytes[6] = (voltage - 1000 )  & 0xFF
  dataBytes[7] = (voltage - 1000 ) >> 8 & 0xF
  can.sendFrame(0, frameId, 8, dataBytes)
}

function tick() {
  sendVoltages(module1StartId + id, mockedCellVoltage)
  sendVoltages(module2StartId + id, mockedCellVoltage)
  sendVoltages(module3StartId + id, mockedCellVoltage)
  sendVoltages(module4StartId + id, mockedCellVoltage)
  sendVoltages(module5StartId + id, mockedCellVoltage)
  sendVoltages(module6StartId + id, mockedCellVoltage)
  sendVoltages(module7StartId + id, mockedCellVoltage)
  sendVoltages(module8StartId + id, mockedCellVoltage)

  id = id+ 1;
  if (id > 2) {
    id = 0
  }
}
