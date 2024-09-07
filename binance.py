# import json
# import time
# from datetime import datetime
#
# import requests
# import websocket
#
#
# class BinanceWebSocketClient:
#     def __init__(self, symbols):
#         self.prices = {}
#         self.symbols = symbols
#         self.started = True
#         self.ws = websocket.WebSocketApp(
#             "wss://stream.binance.com:9443/ws",
#             on_message=self.on_message,
#             on_error=self.on_error,
#             on_close=self.on_close,
#             on_open=self.on_open,
#         )
#
#     def on_message(self, ws, message):
#         data = json.loads(message)
#         if "s" in data:
#             symbol = data["s"].upper()
#             self.prices[symbol] = [float(data["c"]), float(data["E"])]
#
#     def on_error(self, ws, error):
#         self.started = False
#
#     def on_close(self, ws, close_status_code, close_msg):
#         print(f"### closed ### Status code: {close_status_code}, Message: {close_msg}")
#         self.reconnect()
#
#     def reconnect(self):
#         print("Attempting to reconnect...")
#         time.sleep(10)
#         self.ws = websocket.WebSocketApp(
#             "wss://stream.binance.com:9443/ws",
#             on_message=self.on_message,
#             on_error=self.on_error,
#             on_close=self.on_close,
#             on_open=self.on_open,
#         )
#         self.ws.on_open = self.on_open
#         self.run_forever()
#
#     def on_open(self, ws):
#         self.subscribe_to_symbols()
#
#     def subscribe_to_symbols(self):
#         subscribe_message = {"method": "SUBSCRIBE", "params": [], "id": 1}
#         for symbol in self.symbols:
#             subscribe_message["params"].append(symbol.lower() + "@ticker")
#         self.ws.send(json.dumps(subscribe_message))
#
#     def get_symbol_price(self, symbol):
#         return self.prices.get(symbol.upper())
#
#     def run_forever(self):
#         self.ws.run_forever()
#
#
# def get_data_from_last(symbol: Symbol, interval="1m", limit=5):
#     try:
#         url = f"https://api.binance.com/api/v3/klines?symbol={str(symbol).upper()}&interval={interval}&limit={limit}"
#         response = requests.get(url)
#         if response.status_code == 200:
#             data = response.json()
#             if not data:
#                 return None
#             for item in data:
#                 timestamp = datetime.utcfromtimestamp(item[0] / 1000)
#                 open_price = float(item[1])
#                 high_price = float(item[2])
#                 low_price = float(item[3])
#                 close_price = float(item[4])
#                 volume = float(item[5])
#                 # historical_data.append({
#                 #     "timestamp": timestamp,
#                 #     "symbol": symbol.upper(),
#                 #     "open_price": open_price,
#                 #     "high_price": high_price,
#                 #     "low_price": low_price,
#                 #     "close_price": close_price,
#                 #     "volume": volume
#                 # })
#                 PriceData.objects.create(
#                     timestamp=timestamp,
#                     symbol=symbol,
#                     open_price=open_price,
#                     high_price=high_price,
#                     low_price=low_price,
#                     close_price=close_price,
#                     volume=volume,
#                 )
#
#         else:
#             raise FetchBinanceDataException(
#                 f"Failed to retrieve historical data for symbol {symbol}."
#                 f" Response code: {response.status_code}"
#             )
#     except Exception as e:
#         raise FetchBinanceDataException(
#             f"Failed to retrieve historical data for symbol {symbol}."
#         )
#
#
# def get_current_symbol_price(symbol):
#     try:
#         url = "https://api.binance.com/api/v3/ticker/price"
#         params = {"symbol": symbol}
#         response = requests.get(url, params=params)
#         current_timestamp = int(time.time())
#         if response.status_code == 200:
#             data = response.json()
#             symbol_price = float(data["price"])
#             return [symbol_price, current_timestamp]
#         else:
#             raise FetchBinanceDataException(
#                 f"Failed to retrieve data for symbol {symbol}."
#                 f" Response code: {response.status_code}"
#             )
#     except Exception as e:
#         raise FetchBinanceDataException(f"Failed to retrieve data for symbol {symbol}.")
