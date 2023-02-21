import { View, ScrollView, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { AuthNavProps } from "../../../params";
import { COLORS, FONTS } from "../../../constants";
import { styles } from "../../../styles";
import * as Animatable from "react-native-animatable";

const TnC: React.FunctionComponent<AuthNavProps<"TnC">> = ({ navigation }) => {
  React.useLayoutEffect(() => {
    let mounted = true;
    if (mounted) {
      navigation.setOptions({
        headerShown: true,
        headerTitle: `Terms and Conditions`,
        headerTitleStyle: {
          color: "white",
          fontFamily: FONTS.regularBold,
          fontSize: 20,
          letterSpacing: 1,
        },
        headerStyle: {
          backgroundColor: COLORS.main,
          height: 100,
        },
      });
    }
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: COLORS.tertiary, padding: 10 }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Animatable.Image
          animation={"bounce"}
          duration={2000}
          iterationCount={1}
          easing={"linear"}
          direction={"normal"}
          useNativeDriver={false}
          source={{
            uri: Image.resolveAssetSource(
              require("../../../../assets/logo.png")
            ).uri,
          }}
          style={{
            width: 100,
            height: 100,
            marginBottom: 10,
            resizeMode: "contain",
          }}
        />
        <Animatable.Text
          style={{
            marginVertical: 10,
            width: "90%",
            textAlign: "center",
            fontFamily: FONTS.regular,
          }}
          animation={"zoomIn"}
          iterationCount={1}
          useNativeDriver={false}
        >
          welcome to askme, a social application that allows you to chat with
          strangers in your radius, for directions.
        </Animatable.Text>
      </View>
      <Text style={[styles.h1, { textAlign: "center", marginVertical: 20 }]}>
        TERMS and CONDITIONS
      </Text>
      <Text style={[styles.h2, { textDecorationLine: "underline" }]}>
        1. MOBILE APP TERMS AND CONDITIONS OF USE
      </Text>
      <Text style={[styles.p, { marginBottom: 10 }]}>
        This section sets out the terms and conditions ("Terms") of ASKME
        pertaining to the access and use of the information, products, services
        and functions provided on the ASKME App found in the App Store and Play
        Store.
      </Text>
      <Text style={[styles.p, { marginBottom: 10 }]}>
        Should any person that accesses the install ASKME Mobile App, you ("you"
        or "user") disagree with any of the Terms, you must refrain from
        accessing the Mobile App and/or using our services.
      </Text>
      <Text style={[styles.p, { marginBottom: 10 }]}>
        If you are under the age of 18, you must obtain your parents' or legal
        guardians' advance authorization, permission and consent to be bound by
        these Terms before purchasing any products or services.
      </Text>
      <Text style={[styles.p, { marginBottom: 10 }]}>
        Service Provider reserves the right, in its sole discretion, to amend
        and/or replace any of, or the whole of, the Terms. Such amendments shall
        supersede and replace any previous Terms and shall be made available on
        the Mobile App. Each time a user accesses the Mobile App and/or uses the
        services, the user shall be deemed to have consented, by such access
        and/or use, to the Terms, as amended and/or replaced by Service Provider
        from time to time. If you are not satisfied with the amended Terms, you
        should refrain from using the Mobile App.
      </Text>
      <Text style={[styles.p, { marginBottom: 10 }]}>
        We will however give you prior notice where we have collected personal
        information from you and the purpose for which we collected that
        information, is affected by the intended amendment.
      </Text>
      <Text style={[styles.p, { marginBottom: 10 }]}>
        If there is anything in these Terms that you do not understand then
        please contact us as soon as possible - see clause 11 below for contact
        details. Please note that calls to us are charged at national rates and
        may be monitored for training, security and quality assurance purposes.
      </Text>

      <Text style={[styles.h2, { textDecorationLine: "underline" }]}>
        2. CONTENT OF THE MOBILE APP
      </Text>
      <Text style={[styles.p, { marginBottom: 10 }]}>
        Service Provider reserves the right to make improvements, to change or
        to discontinue, without notice, any aspect or feature any information or
        content on the Mobile App.
      </Text>
      <Text style={[styles.p, { marginBottom: 10 }]}>
        Service Provider reserves the right to change and amend the products,
        prices and rates quoted on the Mobile App from time to time without
        notice. Service Provider may use the services of third parties to
        provide information on the Mobile App. Service Provider has no control
        over this information and makes no representations or warranties of any
        nature as to its accuracy, appropriateness or correctness. The user
        agrees that such information is provided "as is" and that Service
        Provider and its online partners shall not be liable for any losses or
        damages that may arise from the user's reliance on it, howsoever these
        may arise.
      </Text>
      <Text style={[styles.p, { marginBottom: 10 }]}>
        Service Provider makes no representations or warranties, whether express
        or implied, as to the accuracy, completeness or reliability of any
        information, data and/or content on Mobile App, including without
        limitation: Service Provider does not warrant that the Mobile App or
        information or downloads shall be error-free or that they shall meet any
        particular criteria of performance or quality. Service Provider
        expressly disclaims all implied warranties, including without
        limitation, warranties of merchantability, fit-ness for a particular
        purpose, noninfringement, compatibility, security and accuracy; whilst
        Service Provider has taken reasonable measures to ensure the integrity
        of the Mobile App and its contents, no warranty, whether express or
        implied, is given that any files, downloads or applications available
        via this Mobile App are free of viruses, or any other data or code which
        has the ability to corrupt, damage or affect the operation of the user's
        system; and Service Provider disclaims any responsibility for the
        verification of any claims. Information published on this Mobile App may
        be done so in the format in which Service Provider receives it and
        statements from external parties are accepted as fact.
      </Text>
      <Text style={[styles.h2, { textDecorationLine: "underline" }]}>
        3. LINKED THIRD PARTY WEBSITES AND THIRD-PARTY CONTENT
      </Text>
      <Text style={[styles.p, { marginBottom: 10 }]}>
        Service Provider may provide links to third party websites on the
        Mobile App. These links are provided to the user for
        convenience purposes only and Service Provider does not endorse, nor
        does the inclusion of any link imply Service Provider's endorsement of,
        Mobile Apps, their owners, licensees or administrators
        or such Mobile Apps' content or security practices and operations.
      </Text>
      <Text style={[styles.p, { marginBottom: 10 }]}>
        While Service Provider tries to provide links only to reputable
        mobile apps or online partners, Service Provider cannot accept
        responsibility or liability for the information provided on other
        mobile applications. Linked mobile apps or pages
        are not under, nor subject to, the control of Service Provider. Service
        Provider is not responsible for and gives no warranties or makes any
        representations in respect of the privacy policies or practices of
        linked or any third party or advertised websites on the
        Mobile App.
      </Text>
      <Text style={[styles.p, { marginBottom: 10 }]}>
        You agree that Service Provider shall not be held liable, directly or
        indirectly, in any way for the content, the use or inability to use or
        access any linked website or any link(s) contained in a linked website,
        nor for any loss or damage of any sort incurred as a result of any
        dealings with, or as the result of the presence of such third party
        linked websites on the Mobile App. Any dealings that you may
        have with any linked websites, including advertisers, found on the
        Mobile App, are solely between you and the third-party
        website.
      </Text>
      <Text style={[styles.h2, { textDecorationLine: "underline" }]}>
        4. USAGE RESTRICTIONS
      </Text>
      <Text style={[styles.p, { marginBottom: 10 }]}>
        The user hereby agrees that it shall not itself, nor through a third
        party: copy (other than for backup, archival or disaster recovery
        purposes), reproduce, translate, adapt, vary, modify, lease, license,
        sub-license, encumber or in any other way deal with any part of the
        Mobile App for any reason and in any manner, unless it is
        consistent with the intent and purpose of these Terms; decompile,
        disassemble or reverse engineer any portion of the Mobile
        App; write and/or develop any derivative of the Website or any other
        software program based on the Mobile App; modify or enhance
        the Mobile App. In the event of a user effecting any
        modifications or enhancements to the Mobile App in breach of
        this clause, such modifications and enhancements shall be the property
        of Service Provider; without Service Provider's prior written consent,
        provide, disclose, divulge or make available to or permit the use of or
        give access to the Mobile App by persons other than the user;
        remove any identification, trademark, copyright or other notices from
        the Mobile App; post or transmit, by means of reviews,
        comments, suggestions, ideas, questions or other information through the
        Mobile App, any content which is unlawful, harmful,
        threatening, abusive, harassing, defamatory, vulgar, obscene,
        sexually-explicit, profane or hateful, or racially, ethnically or
        otherwise objectionable content of any kind; and/or notwithstanding
        anything contained to the contrary in these Terms, use the Mobile App for any purpose other than personal, non-commercial and
        information purposes.
      </Text>
      <Text style={[styles.h2, { textDecorationLine: "underline" }]}>
        5. SECURITY
      </Text>
      <Text style={[styles.p, { marginBottom: 10 }]}>
        In order to ensure the security and reliable operation of the services
        to all Service Provider's users, Service Provider hereby reserves the
        right to take whatever action it may deem necessary to preserve the
        security, integrity and reliability of its network and back-office
        applications. You may not utilize the Mobile App in any
        manner which may compromise the security of
      </Text>
      <Text style={[styles.p, { marginBottom: 10 }]}>
        Service Provider's networks or tamper with the Mobile App in
        any manner whatsoever, which shall include without limitation, gaining
        or attempting to gain unauthorized access to the Mobile App,
        or delivering or attempting to deliver any unauthorized, damaging or
        malicious code to the Mobile App, all of which is
        expressly prohibited. Any person or entity which does so, or attempts to
        do so, shall be held criminally liable. Further, should Service Provider
        suffer any damage or loss, civil damages shall be claimed by Service
        Provider against the user.
      </Text>
      <Text style={[styles.p, { marginBottom: 10 }]}>
        Any user who commits any of the offences detailed in Chapter 13 of the
        Electronic Communications and Transactions Act 25 of 2002 ("ECTA")
        (specifically sections 85 to 88 (inclusive)) shall, notwithstanding
        criminal prosecution, be liable for all resulting liability, loss or
        damages suffered and/or incurred by Service Provider and its affiliates,
        agents and/or partners.
      </Text>
      <Text style={[styles.h2, { textDecorationLine: "underline" }]}>
        6. INTELLECTUAL PROPERTY RIGHTS
      </Text>
      <Text style={[styles.p, { marginBottom: 10 }]}>
        For the purpose of this clause, the following words shall have the
        following meanings ascribed to them:
      </Text>
      <Text style={[styles.p, { marginBottom: 10 }]}>
        "Intellectual property rights" means all and any of the rights in and to
        intellectual property of any nature whatsoever owned and/or controlled
        directly or under license by Service Provider, now or in the future,
        including without limitation, Service Provider's rights, title and
        interest in and to all technology, source code/s, trade secrets, logos,
        systems, methods, trademarks, trade names, styles, insignia, designs,
        patents and copyright, and all similar proprietary rights which may
        subsist in any part of the world, whether registered or not. All
        copyright and other intellectual property rights in all content,
        trademarks, software, data, material, including logos, databases, text,
        graphics, icons, hyperlinks, confidential information, designs,
        agreements, and multimedia works, published on or via the Mobile App ("proprietary material"),
        are the property of, or are licensed to, Service Provider and as such
        are protected from infringement by local and international legislation
        and treaties.
      </Text>
      <Text style={[styles.p, { marginBottom: 10 }]}>
        By submitting reviews, comments and/or any other content (other than
        your personal information) to Service Provider for posting on the
        Mobile App, you automatically grant Service Provider and its
        affiliates a non-exclusive, royalty-free, perpetual, irrevocable right
        and license to use, reproduce, publish, translate, sub-license, copy and
        distribute such content in whole or in part worldwide, and to
        incorporate it in other works in any form, media, or technology now
        known or hereinafter developed, for the full term of any copyright that
        may exist in such content. Subject to this license, you retain any and
        all rights that may exist in such content.
      </Text>
      <Text style={[styles.p, { marginBottom: 10 }]}>
        All rights not expressly granted are reserved and no right, title or
        interest in any proprietary material or information contained in this
        Mobile App is granted to you. Except with Service Provider's
        express written permission, no proprietary material from this Mobile App may be copied or retransmitted.
      </Text>
      <Text style={[styles.p, { marginBottom: 10 }]}>
        Irrespective of the existence of copyright, the user acknowledges that
        Service Provider is the proprietor of all material on the Mobile App (except where a third party is indicated as the proprietor),
        whether it constitutes confidential information or not, and that the
        user has no right, title or interest in any such material.
      </Text>
      <Text style={[styles.p, { marginBottom: 10 }]}>
        Service Provider authorizes you only to view, copy, temporarily download
        to a local drive and to print the content of this Mobile App,
        or any part thereof, provided that such content is used for personal
        purposes and for information purposes only, and such content is used for
        non-commercial purposes.
      </Text>

      <Text style={[styles.h2, { textDecorationLine: "underline" }]}>
        7. RISK, LIMITATION OF LIABILITY AND INDEMNITY
      </Text>
      <Text style={[styles.p, { marginBottom: 10 }]}>
        The user's use of this mobile app and the information
        contained on the mobile app is entirely at the user's own
        risk and the user assumes full responsibility and risk of loss resulting
        from the use thereof.
      </Text>
      <Text style={[styles.p, { marginBottom: 10 }]}>
        The transmission of information via the internet, including without
        limitation e-mail, is susceptible to monitoring and interception. The
        user bears all risk of transmitting information in this manner. Under no
        circumstances shall service provider be liable for any loss, harm, or
        damage suffered by the user as a result thereof. Service provider
        reserves the right to request independent verification of any
        information transmitted via e-mail and the user consents to such
        verification should service provider deem it necessary.
      </Text>
      <Text style={[styles.p, { marginBottom: 10 }]}>
        To the extent permissible by law:
      </Text>
      <Text style={[styles.p, { marginBottom: 10 }]}>
        Neither service provider, its affiliates, shareholders, agents,
        consultants or employees shall be liable for any damages whatsoever,
        including without limitation any direct, indirect, special, incidental,
        consequential or punitive damages, howsoever arising (whether in an
        action arising out of contract, statute, delict or otherwise) related to
        the use of, or the inability to access or use the content of the mobile App
        or any functionality thereof, or the information contained on the
        mobile app, or of any linked website or mobile app, even if
        service provider knows or should reasonably have known or is expressly
        advised thereof.
      </Text>
      <Text style={[styles.p, { marginBottom: 10 }]}>
        ii. The liability of service provider for faulty execution of the
        mobile app as well as all damages suffered by the user,
        whether direct or indirect, as a result of the malfunctioning of the
        website shall be limited to service provider rectifying the malfunction,
        within a reasonable time and free of charge, provided that service
        provider is notified immediately of the damage or faulty execution of
        the mobile app. This liability shall fall away and be
        expressly excluded if the user attempts to correct or allows third
        parties to correct or attempt to correct the mobile app
        without the prior written approval of service provider. However, in no
        event shall service provider be liable to the user for loss of profits
        or for special, incidental, consequential or punitive losses or damages
        arising out of or in connection with the mobile app or its
        use or the delivery, installation, servicing, performance or use of it
        in combination with other computer software.
      </Text>
      <Text style={[styles.p, { marginBottom: 10 }]}>
        You hereby unconditionally and irrevocably indemnify service provider
        and agree to hold service provider free from all loss, damages, claims
        and/or costs, of whatsoever nature suffered or incurred by service
        provider or instituted against service provider as a direct or indirect
        result of: your use of the mobile app; software, programs and
        support services supplied by, obtained by or modified by you or any
        third party without the consent or knowledge of service provider; your
        failure to comply with any of the terms or any other requirements which
        service provider may impose from time to time; the actions or
        requirements of any telecommunications authority or a supplier of
        telecommunications services or software; or any unavailability of, or
        interruption in, the service which is beyond the control of service
        provider.
      </Text>
      <Text style={[styles.p, { marginBottom: 10 }]}>
        Service provider makes no warranty or representation as to the
        availability, accuracy or completeness of the content of the mobile app. You expressly waive and renounce all your rights of whatever
        nature that you may have against service provider for any LOSS suffered
        by you, as a result of information supplied by service provider being
        incorrect, incomplete or inaccurate.
      </Text>

      <Text style={[styles.h2, { textDecorationLine: "underline" }]}>
        8. SERVICE PROVIDER PRIVACY AND COOKIE POLICY
      </Text>
      <Text style={[styles.p, { marginBottom: 10 }]}>
        This clause 8 provides details about our Privacy and Cookie Policy,
        which Policy forms part of these Terms. Service Provider takes your
        privacy seriously and is committed to protecting your personal
        information. We use the personal information that we collect from you in
        accordance with this Privacy and Cookie Policy. Personal information
        when used in this Policy means information that can identify you as an
        individual or is capable of identifying you. By personal information we
        don't mean general, statistical, aggregated or anonymized information.
        Your use of our services signifies your consent to us collecting and
        using your personal information as specified below.
        We are to provide only the estimated location of your where abouts, 
        using a modifiable radius.
      </Text>
      <Text style={[styles.h2, { textDecorationLine: "underline" }]}>
        9. CONFIDENTIALITY
      </Text>
      <Text style={[styles.p, { marginBottom: 10 }]}>
        By subscribing as a user, you agree that you shall hold in the strictest
        confidence and not disclose to any third-party information acquired in
        connection with any aspect of the products and/or services offered by
        Service Provider. You shall notify Service Provider should you discover
        any loss or unauthorized disclosure of the information. Any information
        or material sent to Service Provider will be deemed not to be
        confidential, unless otherwise agreed in writing by the user and Service
        Provider.
      </Text>
      <Text style={[styles.h2, { textDecorationLine: "underline" }]}>
        10. BREACH OR CANCELLATION BY SERVICE PROVIDER
      </Text>
      <Text style={[styles.p, { marginBottom: 10 }]}>
        Service Provider is entitled without notice, in addition to any other
        remedy available to it at law or under these Terms, including obtaining
        an interdict, to cancel these Terms, limit or deny such user use of the
        mobile app and services, or to claim specific performance of
        any obligation whether or not the due date for performance has arrived,
        in either event without prejudice to Service Provider's right to claim
        damages, should any user: breach any of these Terms; in the sole
        discretion of Service Provider, use the mobile app in an
        unauthorized manner; or infringe any statute, regulation, ordinance or
        law
      </Text>
      <Text style={[styles.p, { marginBottom: 10 }]}>
        Breach of these Terms entitles Service Provider to take legal action
        without prior notice to the user and the user agrees to reimburse the
        costs associated with such legal action to Service Provider on an
        attorney and own client scale.
      </Text>
      <Text style={[styles.h2, { textDecorationLine: "underline" }]}>
        12. COMPLIANCE WITH LAWS
      </Text>
      <Text style={[styles.p, { marginBottom: 10 }]}>
        You shall comply with all applicable laws, statues, ordinances and
        regulations pertaining to your use of and access to this mobile app.
      </Text>
      <Text style={[styles.h2, { textDecorationLine: "underline" }]}>
        13.NOTICES
      </Text>
      <Text style={[styles.p, { marginBottom: 10 }]}>
        Except as explicitly stated otherwise, any notices shall be given by
        email to info@imaginedearth.com (in the case of Service Provider) or to
        the e-mail address you have provided to Service Provider (in your case),
        or such other address that has been specified. Notice shall be deemed
        given 48 (forty eight) hours after an email is sent, unless the sending
        party is notified that the email address is invalid. Alternatively,
        Service Provider may give you notice by registered mail, postage prepaid
        and return receipt requested, to the address which you have provided to
        Service Provider. In such case, notice shall be deemed given 7 (seven)
        days after the date of mailing. You acknowledge that all agreements,
        notices or other communication required to be given in terms of the law
        or these Terms may be given via electronic means and that such
        communications shall be "in writing". Notwithstanding anything to the
        contrary, a written notice or communication actually received by a party
        shall be an adequate written notice or communication to it,
        notwithstanding that it was not sent to or delivered at its chosen
        address(es) for that purpose.
      </Text>
      <Text style={[styles.h2, { textDecorationLine: "underline" }]}>
        14. GENERAL CLAUSES
      </Text>
      <Text style={[styles.p, { marginBottom: 10 }]}>
        These Terms shall be governed in all respects by the laws of the
        Republic of South Africa as such laws are applied to agreements entered
        into and to be performed within South Africa. This mobile app is
        controlled, operated and administered by Service Provider from its
        offices within the Republic of South Africa. Service Provider makes no
        representation that the content of the mobile app is
        appropriate or available for use outside of South Africa. Access to the
        mobile app from territories or countries where the content of
        the mobile app is illegal is prohibited. Users may not use this mobile app in
        violation of South African export laws and regulations. If the user
        accesses this mobile app from locations outside of South
        Africa, that user is responsible for compliance with all local laws.
        Service Provider does not guarantee continuous, uninterrupted or secure
        access to our services, as operation of our mobile app may be
        interfered with as a result of a number of factors which are outside of
        our control.
      </Text>
      <Text style={[styles.p, { marginBottom: 10 }]}>
        If any provision of these Terms is held to be illegal, invalid or
        unenforceable for any reason, such provision shall be struck out from
        these Terms and the remaining provisions shall be enforced to the full
        extent of the law.
      </Text>
      <Text style={[styles.p, { marginBottom: 10 }]}>
        Service Provider's failure to act with respect to a breach by you or
        others does not constitute a waiver of our right to act with respect to
        subsequent or similar breaches.
      </Text>
      <Text style={[styles.p, { marginBottom: 10 }]}>
        You shall not be entitled to cede your rights or assign your rights or
        delegate your obligations in terms of these Terms to any third party
        without the prior written consent of Service Provider. No party shall be
        bound by any express or implied term, representation, warranty, promise
        or the like not recorded herein, whether it induced the contract and/or
        whether it was negligent or not.
      </Text>

      <Text style={[styles.p, { marginBottom: 10 }]}>
        The head notes to the paragraphs to these Terms are inserted for
        reference purposes only and shall not affect the interpretation of any
        of the provisions to which they relate. Words importing the singular
        shall include the plural and vice versa, and words importing the
        masculine gender shall include females and words importing persons shall
        include partnerships and corporate and unincorporated entities.
      </Text>
      <Text style={[styles.p, { marginBottom: 10 }]}>
        These Terms set forth the entire understanding and agreement between
        Service Provider and you with respect to the subject matter hereof.
      </Text>

      <View
        style={{
          padding: 10,
          marginHorizontal: 50,
          flexDirection: "row",
          paddingBottom: 100,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.replace("Register");
          }}
          activeOpacity={0.7}
          style={[styles.button, { backgroundColor: COLORS.main, flex: 1 }]}
        >
          <Text style={[styles.button__text, { fontSize: 20 }]}>I AGREE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.replace("Welcome");
          }}
          activeOpacity={0.7}
          style={[
            styles.button,
            {
              backgroundColor: COLORS.secondary,
              margin: 0,
              marginLeft: 10,
              flex: 1,
            },
          ]}
        >
          <Text style={[styles.button__text, { fontSize: 20 }]}>I DECLINE</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default TnC;
