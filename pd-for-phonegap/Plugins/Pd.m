
#import "Pd.h"
#import "PdAudioController.h"

#import <Cordova/CDVPluginResult.h>

@interface Pd()
@property (nonatomic, retain) PdAudioController *audioController;
- (void) openAndRunTestPatch;
@end


@implementation Pd {}

@synthesize audioController = audioController_;

- (void) setup:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options
{
    NSString* callbackId = [arguments pop];
    NSLog(@"Pd Setup begin");
    CDVPluginResult* pluginResult;
    NSString* javaScript = nil;

    @try {
		self.audioController = [[[PdAudioController alloc] init] autorelease];

		[self.audioController configurePlaybackWithSampleRate:44100 numberChannels:2 inputEnabled:YES mixingEnabled:NO];
		[PdBase openFile:@"test2.pd" path:[[NSBundle mainBundle] resourcePath]];
		[self.audioController setActive:YES];
		[self.audioController print];

        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"OK"];
        javaScript = [pluginResult toSuccessCallbackString:callbackId];
    } @catch (NSException* exception) {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_JSON_EXCEPTION messageAsString:[exception reason]];
        javaScript = [pluginResult toErrorCallbackString:callbackId];
    }
    [self writeJavascript:javaScript];
    NSLog(@"Pd Setup end");
}

- (void) send:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options
{
    NSString* callbackId = [arguments pop];
    
    CDVPluginResult* pluginResult = nil;
    NSString* javaScript = nil;
    
    
    NSNumber *leftval     = [arguments objectAtIndex:0];
    NSNumber *rightval     = [arguments objectAtIndex:1];
    //NSLog(@"Pd setting values");

    @try {
        [PdBase sendFloat:[leftval floatValue] toReceiver: @"left" ];
        [PdBase sendFloat:[rightval floatValue] toReceiver: @"right" ];
        
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"OK"];
        javaScript = [pluginResult toSuccessCallbackString:callbackId];
    } @catch (NSException* exception) {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_JSON_EXCEPTION messageAsString:[exception reason]];
        javaScript = [pluginResult toErrorCallbackString:callbackId];
    }
    [self writeJavascript:javaScript];
}

- (void)openAndRunTestPatch {
	// open patch located in app bundle
	void *x = [PdBase openFile:@"test2.pd" path:[[NSBundle mainBundle] bundlePath]];
	[self.audioController setActive:YES];
}

- (void)setAudioActive:(BOOL)active {
	[self.audioController setActive:active];
}


@end
