/**
 * 使用此文件来定义自定义函数和图形块。
 * 想了解更详细的信息，请前往 /blocks/custom
 */
enum MyEnum {
    //% block="one"
    One,
    //% block="two"
    Two
}
//温湿度传感器相关**************************
enum DHTtype {
    //% block="DHT11"
    DHT11,
    //% block="DHT22"
    DHT22,
}

enum dataType {
    //% block="humidity"
    humidity,
    //% block="temperature"
    temperature,
}

enum PingUnit {
    //% block="微秒"
    MicroSeconds,
    //% block="厘米"
    Centimeters
}


//颜色传感器相关*************I2C***********
namespace CrocoKit_Sensor {
/*
    //% blockId=CrocoKit_Sensor_Light block="Light|pin %pin"
    //% weight=100
    //% blockGap=20
    //% color="#228B22"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function Light(pin: AnalogPin): number {
        let value: number;
        value = pins.analogReadPin(pin);
        return value;
    }
    
    //% blockId=CrocoKit_Sensor_Ultrasonic block="Ultrasonic|Trig %Trig|Echo %Echo"
    //% color="#228B22"
    //% weight=97
    //% blockGap=20
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function Ultrasonic(Trig: DigitalPin, Echo: DigitalPin): number {
        //send pulse
        pins.setPull(Trig, PinPullMode.PullNone);
        pins.digitalWritePin(Trig, 0);
        control.waitMicros(2);
        pins.digitalWritePin(Trig, 1);
        control.waitMicros(10);
        pins.digitalWritePin(Trig, 0);

        //read pulse, maximum distance=500cm
        const d = pins.pulseIn(Echo, PulseValue.High, 500 * 58);

        return Math.idiv(d, 58);
    }


    //% blockId=CrocoKit_Sensor_IR block="IR|pin %pin|value %value"
    //% weight=96
    //% blockGap=20
    //% color="#228B22"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function IR(pin: DigitalPin, value: enObstacle): boolean {
        pins.setPull(pin, PinPullMode.PullUp);
        return pins.digitalReadPin(pin) == value;
    }

    //% blockId=CrocoKit_Sensor_Vibration block="Vibration|pin %pin|get "
    //% weight=95
    //% blockGap=20
    //% color="#228B22"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function Vibration(pin: DigitalPin, handle: () => void): void {
        pins.setPull(pin, PinPullMode.PullUp);
        pins.setEvents(pin, PinEventType.Pulse);
        pins.onPulsed(pin, PulseValue.High, handle);
    }

    //% blockId=CrocoKit_Sensor_Hall block="Hall|pin %pin|get "
    //% weight=94
    //% blockGap=20
    //% color="#228B22"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function Hall(pin: DigitalPin, handle: () => void): void {
        pins.setPull(pin, PinPullMode.PullUp);
        pins.setEvents(pin, PinEventType.Pulse);
        pins.onPulsed(pin, PulseValue.High, handle);

    }*/
}





/**
 * 自定义图形块
 */
//% block="瓦力基础传感器" weight=500 color=#0fbcff icon="\uf069"
namespace wali {
    /**
     * TODO: 在此处描述您的函数
     * @param n 在此处描述参数, eg: 5
     * @param s 在此处描述参数, eg: "Hello"
     * @param e 在此处描述参数
     */
    //% block="初始化瓦力板卡"
    export function init() {
        // Add code here
        basic.showLeds(`
            . . . . .
            # . . . #
            # . # . #
            . # . # .
            . . . . .
            `)
    }

    /**
     * TODO: 在此处描述您的函数
     * @param pin_num 在此处描述”值“, eg: 5
     */
    //% subcategory="火焰传感器"
    //% block="读取引脚|%pin_num|的火焰值"
    export function get_huoyan(pin_num: AnalogPin): number {
        return pins.analogReadPin(pin_num);
    }

    /**
   * TODO: 在此处描述您的函数
   * @param pin_num 在此处描述”值“, eg: 5
   */
    //% subcategory="风扇"
    //% block="控制引脚|%pin_num|风扇正转"
    export function fs_forward(pin_num: DigitalPin) {
        pins.digitalWritePin(pin_num, 0);
        pins.digitalWritePin(pin_num + 1, 1);
    }

    /**
     * TODO: 在此处描述您的函数
     * @param pin_num 在此处描述”值“, eg: 5
     */
    //% subcategory="风扇"
    //% block="控制引脚|%pin_num|风扇反转"
    export function fs_reverse(pin_num: DigitalPin) {
        pins.digitalWritePin(pin_num, 1);
        pins.digitalWritePin(pin_num + 1, 0);
    }

    /**
        * TODO: 在此处描述您的函数
        * @param pin_num 在此处描述”值“, eg: 5
        */
    //% subcategory="风扇"
    //% block="停止引脚|%pin_num的风扇"
    export function fs_stop(pin_num: DigitalPin) {
        pins.digitalWritePin(pin_num, 0);
        pins.digitalWritePin(pin_num+1, 0);
    }

    /**
       * TODO: 在此处描述您的函数
       */
    //% subcategory="温湿度传感器"
    //% block="获取湿度的值"
    export function readhum(): number {
        queryData(DHTtype.DHT11, DigitalPin.P0, false, false, false)
        return readData(dataType.humidity);
    }

    /**
      * TODO: 在此处描述您的函数
      */
    //% subcategory="温湿度传感器"
    //% block="获取温度的值"
    export function readTem(): number {
        queryData(DHTtype.DHT11, DigitalPin.P0, false, false, false)
        return readData(dataType.temperature);
    }

    /**
    * TODO: 在此处描述您的函数
    * @param pin_num 在此处描述”值“, eg: 5
    */
    //% subcategory="舵机"
    //% block="瓦力电机|引脚%pin_num|转动 %value度"
    export function Set_pn(pin_num: AnalogPin, value: number) {
        pins.servoWritePin(pin_num, value)
    }

    /**
     * 超声波传感器
     * Send a ping and get the echo time (in microseconds) as a result
     * @param trig tigger pin
     * @param echo echo pin
     * @param unit desired conversion unit
     * @param maxCmDistance maximum distance in centimeters (default is 500)
     */
    //% blockId=sonar_ping block="发射引脚 %trig| 接收引脚 %echo| 单位 %unit"
    //% subcategory="超声波传感器"
    export function ping(trig: DigitalPin, echo: DigitalPin, unit: PingUnit, maxCmDistance = 500): number {
        // send pulse
        pins.setPull(trig, PinPullMode.PullNone);
        pins.digitalWritePin(trig, 0);
        control.waitMicros(2);
        pins.digitalWritePin(trig, 1);
        control.waitMicros(10);
        pins.digitalWritePin(trig, 0);

        // read pulse
        const d = pins.pulseIn(echo, PulseValue.High, maxCmDistance * 58);

        switch (unit) {
            case PingUnit.Centimeters: return Math.idiv(d, 58);
        //    case PingUnit.Inches: return Math.idiv(d, 148);
            default: return d;
        }
    }


    let _temperature: number = 0.0
    let _humidity: number = 0.0
    let _readSuccessful: boolean = false

    function queryData(DHT: DHTtype, dataPin: DigitalPin, pullUp: boolean, serialOtput: boolean, wait: boolean) {

        //initialize
        let startTime: number = 0
        let endTime: number = 0
        let checksum: number = 0
        let checksumTmp: number = 0
        let dataArray: boolean[] = []
        let resultArray: number[] = []
        for (let index = 0; index < 40; index++) dataArray.push(false)
        for (let index = 0; index < 5; index++) resultArray.push(0)
        _humidity = -999.0
        _temperature = -999.0
        _readSuccessful = false

        startTime = input.runningTimeMicros()

        //request data
        pins.digitalWritePin(dataPin, 0) //begin protocol
        basic.pause(18)
        if (pullUp) pins.setPull(dataPin, PinPullMode.PullUp) //pull up data pin if needed
        pins.digitalReadPin(dataPin)
        while (pins.digitalReadPin(dataPin) == 1);
        while (pins.digitalReadPin(dataPin) == 0); //sensor response
        while (pins.digitalReadPin(dataPin) == 1); //sensor response

        //read data (5 bytes)
        for (let index = 0; index < 40; index++) {
            while (pins.digitalReadPin(dataPin) == 1);
            while (pins.digitalReadPin(dataPin) == 0);
            control.waitMicros(28)
            //if sensor pull up data pin for more than 28 us it means 1, otherwise 0
            if (pins.digitalReadPin(dataPin) == 1) dataArray[index] = true
        }

        endTime = input.runningTimeMicros()

        //convert byte number array to integer
        for (let index = 0; index < 5; index++)
            for (let index2 = 0; index2 < 8; index2++)
                if (dataArray[8 * index + index2]) resultArray[index] += 2 ** (7 - index2)

        //verify checksum
        checksumTmp = resultArray[0] + resultArray[1] + resultArray[2] + resultArray[3]
        checksum = resultArray[4]
        if (checksumTmp >= 512) checksumTmp -= 512
        if (checksumTmp >= 256) checksumTmp -= 256
        if (checksum == checksumTmp) _readSuccessful = true

        //read data if checksum ok
        if (_readSuccessful) {
            if (DHT == DHTtype.DHT11) {
                //DHT11
                _humidity = resultArray[0] + resultArray[1] / 100
                _temperature = resultArray[2] + resultArray[3] / 100
            } else {
                //DHT22
                let DHT22_dataArray: number[] = [0, 0]
                let tmpData: number = 1
                for (let index = 0; index <= 1; index++) {
                    for (let index2 = 0; index2 < 16; index2++) {
                        if (dataArray[16 * index + index2]) {
                            if (index == 1 && index2 == 0) tmpData = -1 //positive or negative temperature indicator
                            else DHT22_dataArray[index] += 2 ** (15 - index2)
                        }
                    }
                }
                _humidity = DHT22_dataArray[0] / 10
                _temperature = DHT22_dataArray[1] / 10 * tmpData
            }
        }

        //serial output
        if (serialOtput) {
            let DHTstr: string = ""
            if (DHT == DHTtype.DHT11) DHTstr = "DHT11"
            else DHTstr = "DHT22"
            serial.writeLine(DHTstr + " query completed in " + (endTime - startTime) + " microseconds")
            if (_readSuccessful) {
                serial.writeLine("Checksum ok")
                serial.writeLine("Humidity: " + _humidity + " %")
                serial.writeLine("Temperature: " + _temperature + " *C")
            } else {
                serial.writeLine("Checksum error")
            }

            serial.writeLine("----------------------------------------")
        }

        //wait 2 sec after query if needed
        if (wait) basic.pause(2000)

    }

    function readData(data: dataType): number {
        if (_readSuccessful) return data == dataType.humidity ? _humidity : _temperature
        else return -999
    }

    function readDataSuccessful(): boolean {
        return _readSuccessful
    }


//颜色传感器相关***********************************

    const COLOR_ADD = 0X53;
    const COLOR_REG = 0x00;
    const COLOR_R = 0X10;
    const COLOR_G = 0X0D;
    const COLOR_B = 0x13;

    let initialized = false;
    let val_red = 0;
    let val_green = 0;
    let val_blue = 0;
    export enum enGetRGB {
        //% blockId="GetValueR" block="红色"
        GetValueR = 0,
        //% blockId="GetValueG" block="绿色"
        GetValueG = 1,
        //% blockId="GetValueB" block="蓝色"
        GetValueB = 2
    }

    export enum enObstacle {
        //% blockId="Obstacle" block="Obstacle"
        Obstacle = 0,
        //% blockId="NoObstacle" block="NoObstacle"
        NoObstacle = 1
    }

    function i2cWriteData(addr: number, reg: number, value: number) {
        let buf = pins.createBuffer(2);
        buf[0] = reg;
        buf[1] = value;
        pins.i2cWriteBuffer(addr, buf);
    }

    function setRegConfig(): void {
        i2cWriteData(COLOR_ADD, COLOR_REG, 0X06);
        i2cWriteData(COLOR_ADD, 0X04, 0X41);
        i2cWriteData(COLOR_ADD, 0x05, 0x01);
    }

    function initColorI2C(): void {
        setRegConfig();
        initialized = true;
    }

    function GetRGB(): void {
        let buff_R = pins.createBuffer(2);
        let buff_G = pins.createBuffer(2);
        let buff_B = pins.createBuffer(2);

        pins.i2cWriteNumber(COLOR_ADD, COLOR_R, NumberFormat.UInt8BE);
        buff_R = pins.i2cReadBuffer(COLOR_ADD, 2);

        pins.i2cWriteNumber(COLOR_ADD, COLOR_G, NumberFormat.UInt8BE);
        buff_G = pins.i2cReadBuffer(COLOR_ADD, 2);

        pins.i2cWriteNumber(COLOR_ADD, COLOR_B, NumberFormat.UInt8BE);
        buff_B = pins.i2cReadBuffer(COLOR_ADD, 2);

        let Red = (buff_R[1] & 0xff) << 8 | (buff_R[0] & 0xff);
        let Green = (buff_G[1] & 0xff) << 8 | (buff_G[0] & 0xff);
        let Blue = (buff_B[1] & 0xff) << 8 | (buff_B[0] & 0xff);

        if (Red > 4500) Red = 2300;
        if (Green > 7600) Green = 4600;
        if (Blue > 4600) Blue = 2700;

        val_red = Math.map(Red, 0, 2300, 0, 255);
        val_green = Math.map(Green, 0, 4600, 0, 255);
        val_blue = Math.map(Blue, 0, 2700, 0, 255);

        if (val_red > 255) val_red = 255;
        if (val_green > 255) val_green = 255;
        if (val_blue > 255) val_blue = 255;
        /*
                if (val_red == val_green && val_red == val_blue) {
                    val_red = 255;
                    val_green = 255;
                    val_blue = 255;
                }
                else if (val_red > val_green && val_red > val_blue) {
                    val_red = 255;
                    val_green /= 2;
                    val_blue /= 2;
                }
                else if (val_green > val_red && val_green > val_blue) {
                    val_green = 255;
                    val_red /= 2;
                    val_blue /= 2;
                }
                else if (val_blue > val_red && val_blue > val_green) {
                    val_blue = 255;
                    val_red /= 2;
                    val_green /= 2;
                }*/
    }
    //% subcategory="颜色传感器"
    //% block="颜色成分中|%value|的值"
    export function GetRGBValue(value: enGetRGB): number {
        if (!initialized) {
            initColorI2C();
        }
        GetRGB();
        switch (value) {
            case enGetRGB.GetValueR:
                return val_red;
            case enGetRGB.GetValueG:
                return val_green;
            case enGetRGB.GetValueB:
                return val_blue;
            default:
                break;
        }
        return 0;
    }







}






