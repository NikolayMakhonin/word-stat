#ifdef _WIN32
#include <windows.h>
#endif

#include <node.h>
#include <v8.h>

using namespace v8;

namespace nodejs{
	void test(const FunctionCallbackInfo<Value>& args) {
		Isolate* isolate = args.GetIsolate();

		args.GetReturnValue().Set(
			String::NewFromUtf8(isolate,
				"Test",
				NewStringType::kNormal).ToLocalChecked());
	}

	// Not using the full NODE_MODULE_INIT() macro here because we want to test the
	// addon loader's reaction to the FakeInit() entry point below.
	extern "C" NODE_MODULE_EXPORT void
	NODE_MODULE_INITIALIZER(
		Local<Object> exports,
		Local<Value> module,
		Local<Context> context
	) {
		NODE_SET_METHOD(exports, "test", test);

		Isolate *isolate = exports->GetIsolate();

		#ifdef _WIN32
			bool isWin = true;
		#else
			bool isWin = false;
		#endif

		exports->Set(context, String::NewFromUtf8(isolate, "isWin", NewStringType::kNormal).ToLocalChecked(), Boolean::New(isolate, isWin));
	}

	static void FakeInit(
		Local<Object> exports,
		Local<Value> module,
		Local<Context> context
	) {
		auto isolate = context->GetIsolate();
		auto exception = Exception::Error(String::NewFromUtf8(isolate,
			"FakeInit should never run!", NewStringType::kNormal)
				.ToLocalChecked());
		isolate->ThrowException(exception);
	}

	// Define a Node.js module, but with the wrong version. Node.js should still be
	// able to load this module, multiple times even, because it exposes the
	// specially named initializer above.
	#undef NODE_MODULE_VERSION
	#define NODE_MODULE_VERSION 3
	NODE_MODULE(NODE_GYP_MODULE_NAME, FakeInit)
}
